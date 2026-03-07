'use client'

import { useRouter } from 'next/navigation'

import { useUiStore } from '@/zustand/loader.store'

export function useSmartRouter() {
  const router = useRouter()
  const start = useUiStore((s) => s.startRouteLoading)

  const push = (href: string) => {
    start()
    router.push(href)
  }

  const replace = (href: string) => {
    start()
    router.replace(href)
  }

  return {
    push,
    replace,
    back: router.back,
    refresh: router.refresh,
    prefetch: router.prefetch,
  }
}
