import { z } from 'zod'
import { list, put } from '@vercel/blob'
import { authorizedProcedure, router } from '../../../trpc'

export const photosRouter = router({
  paginatePhotosFromVercelStorage: authorizedProcedure
    .query(async ({ input }) => {
      const { blobs } = await list()

      return {
        blobs,
      }
    }),
  uploadImageToVercelStorage: authorizedProcedure
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
