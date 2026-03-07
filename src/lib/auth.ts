import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { prisma } from '@/lib/prisma'

const IDLE_TTL_SECONDS = 60 * 60
const UPDATE_AGE_SECONDS = 5 * 60
const ABSOLUTE_MAX_MS = 12 * 60 * 60 * 1000

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: IDLE_TTL_SECONDS,
    updateAge: UPDATE_AGE_SECONDS,
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const email = String(creds?.email ?? '')
          .toLowerCase()
          .trim()
        const password = String(creds?.password ?? '')
        if (!email || !password) return null

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, image: true, password: true },
        })

        if (!user?.password) return null

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return null

        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user && user.id) {
        token.userId = user.id
        token.startedAt = Date.now()
      }

      token.absoluteMaxMs = ABSOLUTE_MAX_MS
      token.idleTtlMs = IDLE_TTL_SECONDS * 1000
      return token
    },

    async session({ session, token }) {
      session.user.id = token.userId as string
      session.startedAt = token.startedAt as number
      session.absoluteMaxMs = token.absoluteMaxMs as number
      session.idleTtlMs = token.idleTtlMs as number
      return session
    },
  },

  pages: {
    signIn: '/agency/sign-in',
  },
})
