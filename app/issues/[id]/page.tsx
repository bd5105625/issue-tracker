import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/AuthOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
  params: {
    id: string //params on url is string type
  }
}

// use cache to store issue data instead of always read data when the page loaded -> optimized performance
const fetchIssue = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))

const IssueDetailPage = async ({ params }: Props) => {

  // if (typeof params.id !== 'number') notFound(); // handle wrong id error from url
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(params.id))

  // if issue not found -> redirect to not found page
  if (!issue)
    notFound();

  return (
    // md(in radix UI) is equivalent to lg in tailwind (md=lg, sm=md)
    <Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>
      <Box className='md:col-span-4'>
        <IssueDetail issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  )
}
// force update every second
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id))

  return {
    title: issue?.title,
    description: issue?.id
  }
}

export default IssueDetailPage