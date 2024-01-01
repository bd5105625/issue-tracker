'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname();
  const lists = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues' }
  ]
  const {status, data: session} = useSession();
  return (
    <nav className='border-b mb-3 px-5 py-3 items-center'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='5'>
            <Link href="/"><AiFillBug/></Link>
            <ul className='flex space-x-5'>
              {lists.map(list => (
                <li key={list.href}>
                  <Link 
                    className={classnames({
                      "text-zinc-900": list.href === currentPath,
                      "text-zinc-400": list.href !== currentPath,
                      "hover:text-zinc-600 translate-colors": true
                    })}
                    href={list.href}>{list.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            { status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar 
                    src={session.user!.image!} 
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>

              </DropdownMenu.Root>
              // <Flex gap="2">
              //   <h1>{session.user?.name}</h1>
              // </Flex>
            )}
            { status === 'unauthenticated' && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar