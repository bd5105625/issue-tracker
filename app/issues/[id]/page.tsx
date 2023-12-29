import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string //params on url is string type
  }
}

const IssueDetailPage = async ({ params } : Props) => {
  if (typeof params.id !== 'number') notFound(); // handle wrong id error from url
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
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage