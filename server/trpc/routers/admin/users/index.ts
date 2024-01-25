import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { authorizedProcedure, router } from '../../../trpc'
import { prisma } from '~/server/services/prisma'

export const usersRouter = router({
  paginateUsers: authorizedProcedure
    .query(async ({ input }) => {
      const users = await prisma.user.findMany()

      return {
        users,
      }
    }),

  getUserById: authorizedProcedure
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

  createUser: authorizedProcedure
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

  deleteUser: authorizedProcedure
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

  banUser: authorizedProcedure
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

  unbanUser: authorizedProcedure
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

  changeUserRole: authorizedProcedure
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

  removeUserRole: authorizedProcedure
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
          role: null,
        },
      })

      return {
        user,
      }
    }),

  changUserDetails: authorizedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        name: z.string().min(2).max(50),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          name: input.name,
        },
      })

      return {
        user,
      }
    }),
})
