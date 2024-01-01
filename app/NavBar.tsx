'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath = usePathname();
  const lists = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues' }
  ]
  const {status, data: session} = useSession();
  return (
    <nav className='flex space-x-5 border-b mb-3 px-5 h-14 items-center'>
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
      <Box>
        { status === 'authenticated' && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        { status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )

        }
      </Box>
    </nav>
  )
}

export default NavBar