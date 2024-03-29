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
            published: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                id: true,
                email: true,
              },
            },
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
        postCount,
      }
    }),

  getPostBySlug: publicProcedure
    .input(z.object({
      postSlug: z.string(),
    }))
    .query(async ({ input }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug: input.postSlug,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          }
        }
      })

      return {
        post,
      }
    }),
})
