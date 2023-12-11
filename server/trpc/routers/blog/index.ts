
import { z } from 'zod'
import { publicProcedure, router } from '../../trpc'

import { prisma } from '~/server/services/prisma'

export const blogRouter = router({
  paginatePost: publicProcedure
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
