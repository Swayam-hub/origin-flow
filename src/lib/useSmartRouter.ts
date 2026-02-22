'use client'

import { useRouter } from 'next/navigation'

import { useUiStore } from '@/zustand/loader.store'

export function useSmartRouter() {
  const router = useRouter()
  const start = useUiStore((s) => s.startRouteLoading)

  return {
    ...router,
    push: (href: string) => {
      start()
      router.push(href)
    },
    replace: (href: string) => {
      start()
      router.replace(href)
    },
  }
}
