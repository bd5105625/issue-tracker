"use client"
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...'/>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="1">Brad</Select.Item>
          <Select.Item value="2">Ray</Select.Item>
          <Select.Item value="3" disabled={true}>Jay</Select.Item>

        </Select.Group>
      </Select.Content>

    </Select.Root>
  )
}

export default AssigneeSelect