'use client'
import { Button, Callout, TextField } from '@radix-ui/themes';
import React from 'react';
import { ErrorMessage, Spinner } from '@/app/components/index';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '@prisma/client';
import SimpleMDE  from 'react-simplemde-editor'

// Original: import SimpleMDE from "react-simplemde-editor";
// lazy loading and set it only rendered on the client side
// const SimpleMDE = dynamic(
//   () => import('react-simplemde-editor'),
//   { ssr: false }
// )

// interface IssueForm {
//   title: string;
//   description: string;
// }

// initialize interface by importing schema from zod so that we don't have to write it twice
type IssueFormData = z.infer<typeof issueSchema>


const IssueForm = async ({ issue } : { issue?:Issue }) => {
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = React.useState<string>('')
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const onSubmit = handleSubmit(async(data) => {
    try {
      setIsSubmitting(true)
      if (issue)
        await axios.patch('/api/issues/' + issue.id, data)
      else 
        await axios.post('/api/issues', data);
      router.push('/issues')
      // because this client-side page will rerender only every 5 minutes, force it update when submit new issue
      router.refresh() 
    } catch (error) {
      setIsSubmitting(false)
      setError('An unexpected error occurred.')
    }
  })

  
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root className='mb-4' color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form 
        className='space-y-4 ' 
        onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* { errors.title && <Text as='p' color='red'>{errors.title.message}</Text>} */}
        <Controller
          name='description'
          defaultValue={issue?.description}
          control={control}
          render={({field}) => <SimpleMDE placeholder="Content" {...field}/>}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {/* { errors.description && <Text as='p' color='red'>{errors.description.message}</Text>} */}
        
        <Button disabled={isSubmitting}>
          { issue ? 'Update Issue' : 'Submit New Issue' }{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm