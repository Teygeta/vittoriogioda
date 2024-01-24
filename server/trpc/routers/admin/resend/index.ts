import { Resend } from 'resend'
import { publicProcedure, router } from '../../../trpc'
import z from 'zod'
import { UserRole } from '@prisma/client'


const resend = new Resend(process.env.RESEND_API_KEY)

export const resendRouter = router({
  sendRoleRequest: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        email: z.string(),
        role: z.enum(Object.keys(UserRole) as [keyof typeof UserRole]).nullish(),
      })
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['giodavittorio@gmail.com'],
        subject: 'Admin request via Resend',
        html: `<strong>${input.email}</strong> (${input.id}) has requested ${input.role} access.`,
      })

      await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: 'PENDING'
        },
      })

      return {
        data,
      }
    }),
})
