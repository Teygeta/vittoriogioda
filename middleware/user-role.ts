export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()
  const user = useAuthUser()

  const userRole = user.value.role

  if (status.value === 'authenticated') {
    if (userRole === 'ADMIN') {
      return
    }

    else if (!userRole) {
      return navigateTo('/admin')
    }

    else if (userRole === 'AUTHOR') {
      if (to.path !== '/admin/blog/create-post') {
        return navigateTo('/admin')
      }
    }

    else if (userRole === 'MODERATOR') {
      if (to.path !== '/admin/blog/index') {
        return navigateTo('/admin')
      }
    }

    else if (userRole === 'USER') {
      // HACK: User role has no rules yet
      return navigateTo('/admin')
    }
  }
})
