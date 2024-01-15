import type { User } from '@prisma/client'
import type { ISODateString } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    expires: ISODateString
    storeId: string
    user: {
      id: User['id']
      name: User['name']
      image: User['image']
      email: User['email']
      role: User['role']
    }
  }
}
