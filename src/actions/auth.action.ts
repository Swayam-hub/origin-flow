'use server'

import bcrypt from 'bcryptjs'

import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LoginInput, loginSchema, SignupInput, signupSchema } from '@/lib/validation'

export type LoginState = { success: true } | { success: false; error: string }

export async function loginAction(data: LoginInput): Promise<LoginState> {
  const parsed = loginSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    }
  }

  const { email, password } = parsed.data

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  })

  if (!result || result.error) {
    return { success: false, error: 'Invalid credentials' }
  }

  return { success: true }
}

export type SignupState = { success: true } | { success: false; error: string }

export async function signupAction(data: SignupInput): Promise<SignupState> {
  const parsed = signupSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    }
  }

  try {
    const { name, email, password } = parsed.data
    const normalizedEmail = email.toLowerCase().trim()

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    })

    if (existing) {
      return { success: false, error: 'Email already in use' }
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: passwordHash,
        name,
      },
      select: { id: true },
    })
    const result = await signIn('credentials', {
      email: normalizedEmail,
      password,
      redirect: false,
    })
    if (result?.error) {
      return { success: false, error: 'Account created, but login failed. Please sign in.' }
    }
    return { success: true }
  } catch (error) {
    console.error('signupAction error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
