
import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'

import { prisma } from '~/server/services/prisma'

export const blogRouter = router({
  paginatePosts: publicProcedure
    .query(async () => {
      const [posts, postCount] = await prisma.$transaction([
        prisma.post.findMany({
          where: {
            deletedAt: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                id: true,
                username: true,
              },
            }
          },
          // skip: input.skip,
          // take: input.take,
        }),
        prisma.post.count({
          where: {
            deletedAt: null,
          },
        }),
      ])

      return {
        posts,
        postCount
      }
    }),

  getPostById: publicProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .query(async ({ input }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      })

      return {
        post,
      }
    }),
})
