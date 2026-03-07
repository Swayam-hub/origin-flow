'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

import { useUiStore } from '@/zustand/loader.store'

export default function GlobalLoader() {
  const isGlobalLoading = useUiStore((s) => s.isGlobalLoading)
  const loadingText = useUiStore((s) => s.loadingText)

  return (
    <AnimatePresence>
      {isGlobalLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-999 grid place-items-center bg-black/40 backdrop-blur-sm"
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="
              relative w-85 max-w-[calc(100vw-2rem)]
              rounded-2xl border border-border
              bg-card/70 backdrop-blur-xl
              p-6 shadow-2xl
              before:absolute before:inset-0 before:rounded-2xl
              before:border before:border-white/5 before:pointer-events-none
            "
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-primary/10 p-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold">Please wait</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {loadingText ?? 'Processing…'}
                </p>
              </div>
            </div>

            {/* progress bar */}
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ x: '-60%' }}
                animate={{ x: '160%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/2 rounded-full bg-primary/70"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
