import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components/index'

const LoadingNewIssue = () => {
  return (
    <Box className='max-w-xl'>
      {/* Loading... */}
      <Skeleton />
      <Skeleton height="20rem"/>
    </Box>
  )
}

export default LoadingNewIssue