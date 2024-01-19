import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { publicProcedure, router } from '../../../trpc'
import { prisma } from '~/server/services/prisma'

export const usersRouter = router({
  paginateUsers: publicProcedure
    .query(async ({ input }) => {
      const users = await prisma.user.findMany()

      return {
        users,
      }
    }),

  getUserById: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      }),
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      })

      return {
        user,
      }
    }),

  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const user = await prisma.user.create({
        data: {
          email: input.email,
        },
      })

      return {
        user,
      }
    }),

  deleteUser: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          deletedAt: new Date(),
        },
      })
    }),

  banUser: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          banned: true,
        },
      })

      return {
        user,
      }
    }),

  unbanUser: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          banned: false,
        },
      })

      return {
        user,
      }
    }),

  changeUserRole: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        role: z.enum(Object.keys(UserRole) as [keyof typeof UserRole]).nullish(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: input.role,
        },
      })

      return {
        user,
      }
    }),
})
