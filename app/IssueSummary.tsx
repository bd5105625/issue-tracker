import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  open: number
  in_progress: number
  closed: number
}

const IssueSummary = ({ open, in_progress, closed }: Props) => {

  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
      { label: 'Open Issues', value: open, status: 'OPEN' },
      { label: 'In-progress Issues', value: in_progress, status: 'IN_PROGRESS' },
      { label: 'Closed Issues', value: closed, status: 'CLOSED' }
    ]


  return (
    <Flex gap='3'>
      {containers.map(container =>
        <Card key={container.label}>
          <Flex direction='column' gap='3'>
            <Link className='text-sm font-medium' href={`/issues/?status=${container.status}`}>
              {container.label}
            </Link>
            <Text className='font-bold' size='5'>{container.value}</Text>
          </Flex>
        </Card>
      )}
    </Flex>
  )


}

export default IssueSummary
