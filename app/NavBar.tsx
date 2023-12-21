'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname();
  const lists = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues' }
  ]
  return (
    <nav className='flex space-x-5 border-b mb-3 px-5 h-14 items-center'>
      <Link href="/"><AiFillBug/></Link>
      <ul className='flex space-x-5'>
        {lists.map(list => 
          <Link 
            key={list.href}
            className={classnames({
              "text-zinc-900": list.href === currentPath,
              "text-zinc-400": list.href !== currentPath,
              "hover:text-zinc-600 translate-colors": true
            })}
            href={list.href}>{list.name}
          </Link>)}
      </ul>
    </nav>
  )
}

export default NavBar