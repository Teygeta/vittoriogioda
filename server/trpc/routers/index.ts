import { router } from '../trpc'

import { adminRoutes } from './admin'
import { userRoutes } from './user'

export const appRouter = router({
  admin: adminRoutes,
  user: userRoutes,
})

export type AppRouter = typeof appRouter
