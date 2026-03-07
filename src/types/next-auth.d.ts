import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    startedAt: number
    absoluteMaxMs: number
    idleTtlMs: number
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    startedAt?: number
    absoluteMaxMs?: number
    idleTtlMs?: number
  }
}
