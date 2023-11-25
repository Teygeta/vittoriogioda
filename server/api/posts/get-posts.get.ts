import { prisma } from '~/server/services/prisma'

export default defineEventHandler(async (event) => {
  const posts = await prisma.post.findMany()

  return posts
})
