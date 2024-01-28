import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../services/prisma'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: '/admin/login',
    signOut: '/admin/login',
    error: '/admin/login',
    verifyRequest: '/admin/login',
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id

        const userData = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            email: true,
            banned: true,
            role: true,
          },
        })

        if (userData!.banned) {
          throw new Error('Banned')
        }
      }
      return session
    },

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
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
})
