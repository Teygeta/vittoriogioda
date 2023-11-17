import { prisma } from '~/server/services/prisma'

export default defineEventHandler(async (event) => {

  const users = await prisma.user.findMany()

  return users

})
