import type { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '../services/prisma'

export type Context = inferAsyncReturnType<typeof createContext>

export async function createContext() {
  return {
    prisma,
  }
}
