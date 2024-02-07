import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'
import { slug } from '../../../../utils'
import { Prisma } from '@prisma/client'

import { prisma } from '~/server/services/prisma'

export const blogRouter = router({
  paginatePosts: publicProcedure
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

  createDraftPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {

      return uniqueSlug(input.title, slug => prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: input.authorId,

          slug,
        },
      }))
    }),

  updatePost: publicProcedure
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

  getPostById: publicProcedure
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

  publishPost: publicProcedure
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

  unPublishPost: publicProcedure
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

  deletePost: publicProcedure
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

async function uniqueSlug<T>(value: string, create: (value: string) => Promise<T>): Promise<T> {
  let slugValue = slug(value)

  let index = 0
  while (true) {
    index++

    try {
      return await create(slugValue)
    }
    catch (e) {
      if (index > 10) {
        throw e
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        slugValue = `${slugValue}-${index}`
        continue
      }

      throw e
    }
  }
}

