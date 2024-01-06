import React from 'react'
import prisma from '@/prisma/client'
import { Avatar, Flex, Table, Card, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatusBadge } from './components'

const LatestIssue = async () => {

  const issues = await prisma.issue.findMany({
    orderBy: {
      createAt: 'desc'
    },
    take: 5,
    include: { // include other relational table
      assignedToUser: true
    }
  })

  return (
    <Card>
      <Heading mb='3'>The Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue =>
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify='between'>
                  <Flex direction='column' gap='3' align='start'>
                    <Link href={`/issues/${issue.id}`}>
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser?.image!}
                      fallback='?'
                      radius='full'
                      size='3'
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssue