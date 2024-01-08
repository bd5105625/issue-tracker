import prisma from '@/prisma/client'
// Link is the custom Link component
import { Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssueAction from './IssueAction'
import IssueTable, { IssueQuery, columnsName } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams } : Props) => {

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined // prisma won't read property with undefined -> won't do the filtering

  const orderBy = columnsName
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined

  // original code
  // where: {
  //   status: status 
  // }
  const where = { status }

  const page = parseInt(searchParams.page) || 1 
  const pageSize = 6;
  const issueCount = await prisma.issue.count({ where })

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

  return (
    <Flex direction='column' gap='3'>
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </Flex>
  )
}

// make this page a dynamic route -> will update 
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}

export default IssuesPage 