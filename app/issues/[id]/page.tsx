import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import DeleteIssueButton from './DeleteIssueButton'

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
    // md(in radix UI) is equivalent to lg in tailwind (md=lg, sm=md)
    <Grid columns={{ initial: '1', sm: '5'}} gap={'5'}>
      <Box className='md:col-span-4'>
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}
// force update every second
export const dynamic = 'force-dynamic'

export default IssueDetailPage