import { IssueStatusBadge } from '@/app/components/index'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'

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
        <Heading as='h2'>{issue.title}</Heading>
        <Flex gap="2" my="2">

          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createAt.toDateString()}</Text>
        </Flex>
        <Card className='prose mt-4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${params.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage