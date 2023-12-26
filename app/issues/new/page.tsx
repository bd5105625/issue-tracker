'use client'
import React from 'react'
import { Button, TextField, TextArea } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const router = useRouter();
  // console.log(register('description'));

  
  
  return (
    <form 
      className='space-y-4 max-w-xl' 
      onSubmit={handleSubmit((data) => {
        axios.post('/api/issues', data);
        router.push('/issues')
      })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')}/>
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({field}) => <SimpleMDE placeholder="Content" {...field}/>}
      />
      
      <Button onClick={() => {console.log("click button")}}>Submit New Issue</Button>
    </form>
  )
}

export default NewIssue