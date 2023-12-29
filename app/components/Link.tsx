// custom next link with RadixLink
// reason ->
// RadixLink has its style that will change with theme
// but RadixLink will refresh the page, which is not the one like Link from Next do
// so customized a component with two link
import React from 'react'
import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes' 

interface Props {
  href: string,
  children: string
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link