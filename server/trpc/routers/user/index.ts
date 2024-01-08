import { router } from '../../trpc'
import { blogRouter } from './blog'
import { resendRouter } from './resend'

export const userRoutes = router({
  blog: blogRouter,
  resend: resendRouter,
})
