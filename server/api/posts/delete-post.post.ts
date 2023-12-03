import { prisma } from '~/server/services/prisma'

export default defineEventHandler(async (event) => {
  const { postId } = await readBody(event)

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      deletedAt: new Date(),
    },
  })

  console.log(`Post ${postId} deleted`)
})
