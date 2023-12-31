import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetail = ({ issue } : { issue: Issue}) => {
  return (
    <>
      <Heading as='h2'>{issue.title}</Heading>
      <Flex gap="2" my="2">

        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full mt-4'> {/* max-w-full take all the space*/}
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  )
}

export default IssueDetail