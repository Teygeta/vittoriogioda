import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
// import { prisma } from '../services/prisma'
// import { getServerSession } from '#auth'

export type Context = inferAsyncReturnType<typeof createContext>

export async function createContext(event: H3Event) {
  // const session = await getServerSession(event)

  // return {
  //   event,
  //   prisma,
  //   session,
  // }
}
