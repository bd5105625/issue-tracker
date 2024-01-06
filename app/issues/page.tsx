import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
// Link is the custom Link component
import { IssueStatusBadge, Link } from '@/app/components/index'
import IssueAction from './IssueAction'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '../components/Pagination'

interface Props {
  searchParams: {
    status: Status,
    orderBy: keyof Issue,
    page: string
  }
}

const IssuesPage = async ({ searchParams } : Props) => {

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createAt', className: 'hidden md:table-cell' },
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined // prisma won't read property with undefined -> won't do the filtering


  // check whether orderBy is valid 
  const orderBy = columns
    .map(column => column.value) // return an array only contains value property
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  // original code
  // where: {
  //   status: status 
  // }
  const where = { status }

  const page = parseInt(searchParams.page) || 1 
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: status
    },
    orderBy,
    skip: (page-1) * pageSize,
    take: pageSize
    // original code
    // orderBy: {
    //   [searchParams.orderBy]: 'asc',
    // }
    
  })

  const issueCount = await prisma.issue.count({ where })

  

  return (
    <div className=''>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className || ''}>
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value}
                }}>
                  {column.label}
                </NextLink>
                { column.value === searchParams.orderBy && <ArrowUpIcon className='inline'/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell >
                  <Link href={`/issues/${issue.id}`} >
                    {issue.title}
                  </Link>
                  <div className='block md:hidden mt-1'>
                    <IssueStatusBadge status={issue.status}/>
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status}/>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createAt.toDateString()}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  )
}

// make this page a dynamic route -> will update 
export const dynamic = 'force-dynamic'

export default IssuesPage 