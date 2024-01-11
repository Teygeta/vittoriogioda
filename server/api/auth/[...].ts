import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../services/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: '/admin/login',
    signOut: '/admin/login',
    error: '/admin/login',
    verifyRequest: '/admin/login',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),

  callbacks: {

  }
})
