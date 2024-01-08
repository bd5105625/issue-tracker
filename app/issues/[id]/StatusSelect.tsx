'use client'
import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const StatusSelect = ({ issue }: { issue: Issue} ) => {

  const router = useRouter();
  const statuses: { label:string, value: Status}[] = [
    { label: 'Open', value: 'OPEN'},
    { label: 'In Progress', value: 'IN_PROGRESS'},
    { label: 'Closed', value: 'CLOSED'},
  ]

  const assignStatus = async (status: Status) => {
    try {
      
      await axios.patch('/api/issues/' + issue.id, {
        status: status
      })
      router.refresh()
    } catch (error) {
      toast.error("Invalid Status")
      
    }
  }

  return (
    <Select.Root defaultValue={issue.status} onValueChange={assignStatus}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status) => 
            <Select.Item key={status.label} value={status.value}>{status.label}</Select.Item>
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default StatusSelect
