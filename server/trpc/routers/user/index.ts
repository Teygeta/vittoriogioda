import { router } from '../../trpc'

export const userRoutes = router({
  blog: blogRouter,
})
