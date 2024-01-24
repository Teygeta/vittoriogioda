import { Resend } from 'resend'
import { publicProcedure, router } from '../../../trpc'
import z from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

export const resendRouter = router({
  sendEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
        description: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['giodavittorio@gmail.com'],
        subject: 'New lead via Resend',
        html: `Contact: <strong>${input.email}</strong> <br /> Description: <strong>${input.description ? input.description : '-'}</strong>`,
      })

      return {
        data,
      }
    }),
})
