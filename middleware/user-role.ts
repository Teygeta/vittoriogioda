export default defineNuxtRouteMiddleware((to) => {
    const { status } = useAuth()
    const user = useAuthUser()

    const userRole = user.value.role
    // Return immediately if user is already authenticated
    if (status.value === 'authenticated') {
        if (userRole === 'ADMIN') {
            return
        } else if (userRole === 'AUTHOR') {
            if (to.path !== '/blog/create-post') {
                return navigateTo('/admin')
            }
        } else if (userRole === 'MODERATOR') {
            if (to.path !== '/blog/index') {
                return navigateTo('/admin')
            }
        } else if (userRole === 'USER') {
            // HACK: User role has no rules yet
            return navigateTo('/admin')
        }
        else if (!userRole) {
            return navigateTo('/admin')
        }
    }

})