"use client"
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // useQuery for caching -> prevent fetching data when rerender the component
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />

  if (error) return null

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch('/api/issues/' + issue.id, { 
        assignedToUserId: userId !== "null" ? userId : null
      })
    } catch (error) {
      toast.error("Changes could not be saved.")
      
    }
}

  return (
    <>
      <Select.Root 
        defaultValue={issue.assignedToUserId || "null"} // "null" is the value from Select.Item
        onValueChange={assignIssue }>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => 
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            )}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),  // query function for fetching data
  staleTime: 60 * 1000,
  retry: 3
});

export default AssigneeSelect