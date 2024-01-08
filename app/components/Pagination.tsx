'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Flex, Text, Button } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  itemCount: number,
  pageSize: number,
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage}: Props) => {
  const route = useRouter();
  const searchParams = useSearchParams(); 

  const pageCount = Math.ceil(itemCount/pageSize)
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams) // get the current query(parameters) so that we won't change other query
    params.set('page', page.toString())
    route.push('?' + params.toString() )
  }

  return (
    <Flex align={'center'} gap='3'>
      <Text size='2'>Page {currentPage} of {pageCount}</Text>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
