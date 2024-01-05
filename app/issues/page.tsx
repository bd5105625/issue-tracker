import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
// Link is the custom Link component
import { IssueStatusBadge, Link } from '@/app/components/index'
import IssueAction from './IssueAction'
import { Status } from '@prisma/client'



const IssuesPage = async ({ searchParams } : { searchParams: { status: Status}}) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined // prisma won't read property with undefined -> won't do the filtering
  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  })

  return (
    <div className=''>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
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
    </div>
  )
}

// make this page a dynamic route -> will update 
export const dynamic = 'force-dynamic'

export default IssuesPage 