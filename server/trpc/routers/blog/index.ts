
import { z } from 'zod'
import { publicProcedure, router } from '../../trpc'

import { prisma } from '~/server/services/prisma'

export const blogRouter = router({
  paginatePosts: publicProcedure
    .query(async () => {
      const [posts, postCount] = await prisma.$transaction([
        prisma.post.findMany({
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
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

  createDraftPost: publicProcedure
    .input(z.object({
      title: z.string(),
      content: z.string(),
      authorId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const post = await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: input.authorId,
        },
      })

      return {
        post,
      }
    }),

  deletePost: publicProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .query(async ({ input }) => {
      const post = await prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          deletedAt: new Date(),
        },
      })

      return {
        post,
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
