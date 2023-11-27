<script setup lang="ts">
const router = useRouter()
const { status, signIn, signOut } = useAuth()

const isSignedIn = computed(() => status.value === 'authenticated')

// if (isSignedIn) {
//   navigateTo('/admin')
// }

async function handleSignIn() {
  await signIn('github')
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
