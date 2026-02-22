'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { ReactNode, useState } from 'react'

type FloatingInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> & {
  label: string
  error?: string | undefined
  rightSlot?: ReactNode
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, rightSlot, value, defaultValue, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const isActive = focused || !!value || !!defaultValue

    return (
      <motion.div
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="relative w-full"
      >
        <input
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          className={clsx(
            'peer w-full h-12 rounded-xl border px-4 pt-5 pb-2 text-sm outline-none transition-all duration-200',
            'bg-card/70 backdrop-blur-xl',
            'border-border focus:border-primary focus:ring-2 focus:ring-primary/30',
            'placeholder:text-transparent',
            rightSlot ? 'pr-11' : '',
            error && 'border-destructive focus:ring-destructive/30',
            className,
          )}
          {...props}
        />

        <motion.label
          initial={false}
          animate={{ y: isActive ? -10 : 0, scale: isActive ? 0.85 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={clsx(
            'absolute left-4 top-3 pointer-events-none origin-left text-sm',
            'text-muted-foreground',
            focused && 'text-primary',
            error && 'text-destructive',
          )}
        >
          {label}
        </motion.label>

        {rightSlot ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        ) : null}

        {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
      </motion.div>
    )
  },
)

FloatingInput.displayName = 'FloatingInput'
export default FloatingInput
