import { Resend } from 'resend'
import z from 'zod'
import { UserRole } from '@prisma/client'
import { authorizedProcedure, router } from '../../../trpc'

const resend = new Resend(process.env.RESEND_API_KEY)

export const resendRouter = router({
  sendRoleRequest: authorizedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        email: z.string(),
        role: z.enum(Object.keys(UserRole) as [keyof typeof UserRole]).nullish(),
      }),
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const data = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['giodavittorio@gmail.com'],
        subject: 'Admin request via Resend',
        html: `<strong>${input.email}</strong> (${input.userId}) has requested ${input.role} access.`,
      })

      await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: 'PENDING',
        },
      })

      return {
        data,
      }
    }),
})
