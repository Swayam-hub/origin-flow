'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, User } from 'lucide-react'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { signupAction } from '@/actions/auth.action'
import FloatingInput from '@/components/ui/FloatingInput'
import { toast } from '@/lib/toast'
// import { useSmartRouter } from '@/lib/useSmartRouter'
import { SignupInput, signupSchema } from '@/lib/validation'
import { useUiStore } from '@/zustand/loader.store'

import Button from '../ui/Button'

export default function SignupPage() {
  // const router = useSmartRouter()
  const [pending, startTransition] = useTransition()
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const showLoader = useUiStore((s) => s.showLoader)
  const hideLoader = useUiStore((s) => s.hideLoader)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: SignupInput) => {
    showLoader('Creating your account…')

    startTransition(async () => {
      try {
        const res = await signupAction(data)

        if (!res.success) {
          toast.error(res.error)
          return
        }

        toast.success('Account created!')
        // router.push('/agency/sign-in')
      } catch {
        toast.error('Signup failed.')
      } finally {
        hideLoader()
      }
    })
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6">Start building today</h1>
          <p className="text-muted-foreground text-lg">
            Create multi-page websites and deploy instantly with a dev-tool grade experience.
          </p>
        </motion.div>
      </div>

      <div className="flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8"
        >
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Create account</h2>
          <p className="text-sm text-muted-foreground mb-6">Get your workspace ready in minutes</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FloatingInput
              label="Full name"
              disabled={pending}
              {...register('name')}
              error={errors.name?.message}
              rightSlot={<User size={18} className="text-muted-foreground" />}
            />

            <FloatingInput
              label="Email"
              type="email"
              disabled={pending}
              {...register('email')}
              error={errors.email?.message}
              rightSlot={<Mail size={18} className="text-muted-foreground" />}
            />

            <FloatingInput
              label="Password"
              type={showPass ? 'text' : 'password'}
              disabled={pending}
              {...register('password')}
              error={errors.password?.message}
              rightSlot={
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setShowPass((p) => !p)}
                  className="text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                  aria-label="Toggle password"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <FloatingInput
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              disabled={pending}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              rightSlot={
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setShowConfirm((p) => !p)}
                  className="text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                  aria-label="Toggle confirm password"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <Button type="submit" isLoading={pending} fullWidth>
              Create account
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{' '}
            <Link className="text-primary hover:underline" href="/agency/sign-in">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
