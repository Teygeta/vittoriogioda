
import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'


import { prisma } from '~/server/services/prisma'

export const usersRouter = router({
  paginateUsers: publicProcedure
    .query(async ({ input }) => {
      const user = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        }
      })

      return {
        user,
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
