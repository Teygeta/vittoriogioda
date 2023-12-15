<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/admin',
  },
})

const { status, signIn, signOut } = useAuth()

const isSignedIn = computed(() => status.value === 'authenticated')

async function handleSignIn() {
  await signIn('google', { callbackUrl: '/admin' })
}

async function handleSignOut() {
  await signOut()
}
</script>

<template>
  <div class="mx-auto">
    <button v-if="!isSignedIn" @click="handleSignIn">Sign In</button>
    <button v-else @click="handleSignOut">Sign Out</button>
    <div>{{ status }}</div>
  </div>
</template>
