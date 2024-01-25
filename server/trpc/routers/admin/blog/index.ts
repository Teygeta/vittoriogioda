import { z } from 'zod'
import { authorizedProcedure, router } from '../../../trpc'

import { prisma } from '~/server/services/prisma'

export const blogRouter = router({
  paginatePosts: authorizedProcedure
    .input(
      z.object({
        showDeleted: z.boolean().optional(),
      }),
    )
    .query(async ({ input }) => {
      let where = {}
      if (!input.showDeleted) {
        where = {
          deletedAt: null,
        }
      }

      const [postCount, posts] = await prisma.$transaction([
        prisma.post.count({ where }),
        prisma.post.findMany({
          where,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
      ])

      return {
        posts,
        postCount,
      }
    }),

  createDraftPost: authorizedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
      }),
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

  updatePost: authorizedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.update({
        where: {
          id: input.postId,
        },
        data: {
          content: input.content,
        },
      })

      return {
        post,
      }
    }),

  getPostById: authorizedProcedure
    .input(z.object({
      postId: z.string(),
    }))
    .query(async ({ input }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: input.postId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      return {
        post,
      }
    }),

  publishPost: authorizedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
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

  unPublishPost: authorizedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
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

  deletePost: authorizedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
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
