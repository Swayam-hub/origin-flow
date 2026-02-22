'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'

import { useToastStore } from '@/zustand/toast.store'

const iconByType = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
} as const

const accentByType = {
  success: 'text-emerald-400',
  error: 'text-rose-400',
  info: 'text-sky-400',
} as const

export default function Toaster() {
  const { toasts, dismiss } = useToastStore()

  return (
    <div className="fixed right-4 top-4 z-[100] w-[360px] max-w-[calc(100vw-2rem)] space-y-3">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const Icon = iconByType[t.type]
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/75 backdrop-blur-xl shadow-2xl"
            >
              {/* subtle top line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              <div className="flex gap-3 p-4">
                <Icon className={`mt-0.5 h-5 w-5 ${accentByType[t.type]}`} />
                <div className="min-w-0 flex-1">
                  {t.title ? <p className="text-sm font-semibold">{t.title}</p> : null}
                  <p className="text-sm text-muted-foreground">{t.message}</p>
                </div>

                <button
                  onClick={() => dismiss(t.id)}
                  className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition"
                  aria-label="Dismiss toast"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* progress bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: (t.durationMs ?? 3500) / 1000, ease: 'linear' }}
                className="h-1 bg-primary/60"
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
