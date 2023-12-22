import { router } from '../../trpc'

import { blogRouter } from './blog'
import { usersRouter } from './users'

export const adminRoutes = router({
  blog: blogRouter,
  users: usersRouter,
})
