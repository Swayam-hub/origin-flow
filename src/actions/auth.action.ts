'use server'

import { LoginInput, loginSchema } from '@/lib/validation'

export type LoginState = { success: true } | { success: false; error: string }

export async function loginAction(data: LoginInput): Promise<LoginState> {
  const parsed = loginSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { email, password } = parsed.data

  // TODO: call ASP.NET API, verify user, set cookies/session etc.
  // example:
  // const r = await fetch(...)

  // if (email !== 'admin@test.com' || password !== '123456') {
  //   return { success: false, error: 'Invalid credentials' }
  // }

  return { success: true }
}
