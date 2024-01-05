'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const IssueFilter = () => {
  const route = useRouter();
  const searchParams = useSearchParams();

  const statuses: { label: string, value?: Status}[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN'},
    { label: 'In Progress', value: 'IN_PROGRESS'},
    { label: 'Closed', value: 'CLOSED'},
  ]
  return (
    // defaultValue parameter are linked to value in the select.content, that's why '' is equally to all(from statuses object)
    <Select.Root defaultValue={searchParams.get('status') || 'ALL'} onValueChange={(status) => {
      const params = new URLSearchParams();
      if (status) params.append('status', status)
      if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)

      const query = params.size ? '?' + params.toString() : ''
      route.push('issues' + query)

    }}>
      <Select.Trigger placeholder="Filter by status..."/>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || 'ALL'}>
            {status.label}
          </Select.Item>
        ))}

      </Select.Content>
    </Select.Root>
  )
}

export default IssueFilter
