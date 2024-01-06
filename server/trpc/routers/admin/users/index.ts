
import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'


import { prisma } from '~/server/services/prisma'

export const usersRouter = router({
  paginateUsers: publicProcedure
    .query(async ({ input }) => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
        }
      })

      return {
        users,
      }
    }),

  getUserById: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: input.userId
        }
      })

      return {
        user,
      }
    }),

})
