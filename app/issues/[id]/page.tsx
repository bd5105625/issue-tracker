import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props {
  params: {
    id: string //params on url is string type
  }
}

const IssueDetailPage = async ({ params } : Props) => {
  // if (typeof params.id !== 'number') notFound(); // handle wrong id error from url
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  // if issue not found -> redirect to not found page
  if (!issue)
    notFound();

  return (
    <div>
      <Heading as='h2'>{issue.title}</Heading>
      <Flex gap="2" my="2">

        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.description}</Text>
      </Flex>
      <Card>
        <p>{issue.createAt.toDateString()}</p>
      </Card>
    </div>
  )
}

export default IssueDetailPage