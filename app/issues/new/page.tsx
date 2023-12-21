'use client'
import React from 'react'
import { Button, TextField, TextArea } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className='space-y-4 max-w-xl'>
      <TextField.Root>
        <TextField.Input placeholder='Title'/>
      </TextField.Root>
      <SimpleMDE placeholder="Content" />
      <Button onClick={() => {console.log("click button")}}>Submit New Issue</Button>
    </div>
  )
}

export default NewIssue