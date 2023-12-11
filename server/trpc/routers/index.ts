import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

import { blogRouter } from './blog'

export const appRouter = router({
  blog: blogRouter
})

export type AppRouter = typeof appRouter
