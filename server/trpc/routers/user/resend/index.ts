
import { z } from 'zod'
import { publicProcedure, router } from '../../../trpc'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const resendRouter = router({
  sendEmail: publicProcedure
    // .input(z.object({
    //   email: z.string(),
    // }))
    .query(async ({ input }) => {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['giodavittorio@gmail.com'],
        subject: "Hello world",
        html: "<strong>It works!</strong>",
      });

      return {
        data,
      }
    }),
})
