
import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'
import { put, list } from '@vercel/blob'

export const photosRouter = router({
  paginatePhotosFromVercelStorage: publicProcedure
    .query(async ({ input }) => {
      const { blobs } = await list()

      return {
        blobs
      }
    }),
  uploadImageToVercelStorage: publicProcedure
    .input(
      z.object({
        image: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { url } = await put(`photos/${input.image}`, 'Hello World!', { access: 'public' })

      return {
        blob: url
      }
    })
})
