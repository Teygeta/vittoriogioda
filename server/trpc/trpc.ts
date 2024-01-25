/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server'
import type { Context } from '~/server/trpc/context'
import { useAuthUser } from '~/composables/useAuthUser'

const t = initTRPC.context<Context>().create()



/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure
export const router = t.router
export const middleware = t.middleware

/**
 * Protected procedure
 */
const isAuthorized = t.middleware(async ({ ctx, next }) => {
	const user = useAuthUser()

	if (!user.value) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must be logged in to do this',
		})
	}

	return next()
})

export const authorizedProcedure = t.procedure.use(isAuthorized)
