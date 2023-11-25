import { prisma } from '~/server/services/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'postId'))

  const post = await prisma.post.findUnique({
    where: {
      id
    },
  })

  return post
})
