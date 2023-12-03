import { prisma } from '~/server/services/prisma'
import { Prisma } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const { content, authorId } = await readBody(event)

  console.log('Creating post...')

  const postData: Prisma.PostCreateInput = {
    title: 'Titolo post',
    content: content as string,
    author: {
      connect: {
        id: authorId,
      },
    }
  }
  await prisma.post.create({
    data: postData,
  })
})
