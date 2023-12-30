import { Table } from '@radix-ui/themes'
import { Skeleton } from '@/app/components/index'
import IssueAction from './IssueAction'

const LoadingIssuePage = () => {
  const issues = [1,2,3,4,5]
  return (
    <div>
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
              <Table.Row key={issue}>
                <Table.Cell>
                  {/* {issue.title} */}
                  <Skeleton />
                  <div className='block md:hidden mt-1'>
                    {/* <IssueStatusBadge status={issue.status}/> */}
                    <Skeleton />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  {/* <IssueStatusBadge status={issue.status}/> */}
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      
      </Table.Root>
    </div>
  )
}

export default LoadingIssuePage