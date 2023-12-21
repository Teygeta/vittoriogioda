
import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '../../trpc'

import { prisma } from '~/server/services/prisma'

export const usersRouter = router({
  paginateUsers: publicProcedure
    .query(async ({ input }) => {
      const user = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        }
      })

      return {
        user,
      }
    }),

  paginatePosts: protectedProcedure
  .query(async ({ input }) => {
    const post = await prisma.post.findMany({
      where: {
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      }
    })

    return {
      post,
    }
  }),

})
