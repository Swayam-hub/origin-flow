'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useUiStore } from '@/zustand/loader.store'

export default function RouteLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isRouteLoading = useUiStore((s) => s.isRouteLoading)
  const stop = useUiStore((s) => s.stopRouteLoading)

  const prev = useRef<string>('')

  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ''}`
    if (prev.current && prev.current !== key) {
      // navigation completed
      stop()
    }
    prev.current = key
  }, [pathname, searchParams, stop])

  return (
    <AnimatePresence>
      {isRouteLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-200 w-full"
        >
          <motion.div
            initial={{ width: '10%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-0.5 bg-primary"
          />
          {/* subtle glow */}
          <div className="h-0.5 w-full bg-primary/10 blur-[6px]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
