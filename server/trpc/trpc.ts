import { TRPCError, initTRPC } from '@trpc/server'

import { Context } from '~/server/trpc/context'

const t = initTRPC.context<Context>().create()

const isAuthenticated = t.middleware(async ({ ctx: { session }, next }) => {
  const user = session?.user

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      user,
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthenticated)
export const publicProcedure = t.procedure
export const router = t.router
export const middleware = t.middleware
