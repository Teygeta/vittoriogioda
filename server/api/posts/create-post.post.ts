import { prisma } from '~/server/services/prisma'

export default defineEventHandler(async (event) => {
  console.log(event)
  // await prisma.post.create({
  //   data: {
  //     title: event
  //   }
  // })
})
