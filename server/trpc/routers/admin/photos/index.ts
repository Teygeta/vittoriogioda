import { z } from 'zod'
import { list, put } from '@vercel/blob'
import { publicProcedure, router } from '../../../trpc'

export const photosRouter = router({
  paginatePhotosFromVercelStorage: publicProcedure
    .query(async ({ input }) => {
      const { blobs } = await list()

      return {
        blobs,
      }
    }),
  uploadImageToVercelStorage: publicProcedure
    .input(
      z.object({
        image: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { url } = await put(`photos/${input.image}`, 'Hello World!', { access: 'public' })

      return {
        blob: url,
      }
    }),
})
