interface User {
  id: string
  email: string
  name: string
  image: string
}

export function useAuthUser() {
  const { data } = useAuth()

  return computed<User>(() => {
    const user = (data.value?.user ?? null) || {}

    return user as User
  })
}
