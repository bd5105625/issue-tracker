import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditButton from './EditButton'
import IssueDetail from './IssueDetail'

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
    <Grid columns={{ initial: '1', sm: '2'}} gap={'5'}>
      <Box>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <EditButton issueId={issue.id}/>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage