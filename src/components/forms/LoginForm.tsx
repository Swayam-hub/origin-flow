'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { loginAction } from '@/actions/auth.action'
import { toast } from '@/lib/toast'
import { useSmartRouter } from '@/lib/useSmartRouter'
import { LoginInput, loginSchema } from '@/lib/validation'
import { useUiStore } from '@/zustand/loader.store'

import Button from '../ui/Button'
import FloatingInput from '../ui/FloatingInput'

export default function LoginForm() {
  // const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [pending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })
  const showLoader = useUiStore((s) => s.showLoader)
  const hideLoader = useUiStore((s) => s.hideLoader)
  const router = useSmartRouter()

  const onSubmit = (data: LoginInput) => {
    showLoader('Signing you in…')

    startTransition(async () => {
      try {
        const res = await loginAction(data)

        if (!res.success) {
          toast.error(res.error || 'Invalid credentials')
          return
        }
        toast.success('Login Sucessfull!')
        router.push('/agency')
      } finally {
        hideLoader()
      }
    })
  }
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-transparent blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6">Build. Deploy. Scale.</h1>
          <p className="text-muted-foreground text-lg">
            Create multi-page websites in minutes and deploy instantly. Your platform for modern web
            creation.
          </p>
        </motion.div>
      </div>

      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl hover:shadow-primary/10 transition-shadow duration-300 relative before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/5 before:pointer-events-none"
        >
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">Sign in to your workspace</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FloatingInput
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <FloatingInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={errors.password?.message}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null} */}

            <Button type="submit" isLoading={pending} fullWidth>
              Sign In
            </Button>
          </form>

          <Link
            className="text-sm text-muted-foreground mt-6 flex justify-center gap-1"
            href="/agency/sign-up"
          >
            Don’t have an account?{' '}
            <span className="text-primary hover:underline cursor-pointer">Sign up</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
