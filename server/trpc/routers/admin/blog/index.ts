
import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'

import { prisma } from '~/server/services/prisma'

export const blogRouter = router({
  paginatePosts: publicProcedure
    .input(
      z.object({
        showDeleted: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {

      let where = {}
      if (!input.showDeleted) {
        where = {
          deletedAt: null,
        }
      }

      const [posts, postCount] = await prisma.$transaction([
        prisma.post.findMany({
          where,
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
          where,
        }),
      ])

      return {
        posts,
        postCount
      }
    }),

  createDraftPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
      })
    )
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

  publishPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          published: true,
        },
      })

      return {
        post,
      }
    }),

  unPublishPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          published: false,
        },
      })

      return {
        post,
      }
    }),

  deletePost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          deletedAt: new Date(),
          published: false,
        },
      })

      return {
        post,
      }
    }),
})
