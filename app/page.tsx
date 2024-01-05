import Pagination from './components/Pagination'
interface Props {
  searchParams: {
    page: string
  }
}

export default function Home({ searchParams }: { searchParams: { page: string} }) {
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
  )
}
