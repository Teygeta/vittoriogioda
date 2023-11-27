// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: '1f0ac6e0f5a79d897003',
      clientSecret: 'c727fc74cb9e1314b551a226c4b0bcb6cb61fd91'
    })
  ]
})
