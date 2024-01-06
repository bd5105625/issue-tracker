import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

// interface Props {
//   status: Status
// }


// Record is an utility in TS let us to declare specific type in key-value pair
const statusMap: Record<
  Status,
  { label: string, color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'CLOSED', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: Status }) => {

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge