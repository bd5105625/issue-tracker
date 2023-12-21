'use client'
import React from 'react'
import { Button, TextField, TextArea } from '@radix-ui/themes'

const NewIssue = () => {
  return (
    <div className='space-y-4 max-w-sm'>
      <TextField.Root>
        <TextField.Input placeholder='Title'/>
      </TextField.Root>
      <TextArea placeholder="Content" />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssue