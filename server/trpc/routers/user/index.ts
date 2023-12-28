import { router } from '../../trpc'
import { blogRouter } from './blog'

export const userRoutes = router({
  blog: blogRouter,
})
