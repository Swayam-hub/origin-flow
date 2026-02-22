'use client'

import Link, { LinkProps } from 'next/link'
import React from 'react'

import { useUiStore } from '@/zustand/loader.store'

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function SmartLink({ onClick, ...props }: Props) {
  const start = useUiStore((s) => s.startRouteLoading)

  return (
    <Link
      {...props}
      onClick={(e) => {
        start()
        onClick?.(e)
      }}
    />
  )
}
