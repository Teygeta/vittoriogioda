import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

import { blogRouter } from './blog'
import { usersRouter } from './users'

export const appRouter = router({
  blog: blogRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter
