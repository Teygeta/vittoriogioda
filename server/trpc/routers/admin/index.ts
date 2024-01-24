import { router } from '../../trpc'

import { blogRouter } from './blog'
import { usersRouter } from './users'
import { photosRouter } from './photos'
import { resendRouter } from './resend'

export const adminRoutes = router({
  blog: blogRouter,
  users: usersRouter,
  photos: photosRouter,
  resend: resendRouter,
})
