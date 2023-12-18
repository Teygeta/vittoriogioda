<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/admin',
  },
})

const { signIn } = useAuth()

async function handleSignIn() {
  await signIn('google', { callbackUrl: '/admin' })
}
</script>

<template>
  <div class="mx-auto">
    <button class="hover:bg-gray-200 bg-white py-2 px-4 rounded-md flex items-center gap-3" @click="handleSignIn">
      <img src="~/assets/img/google-logo.png" alt="Google" class="w-8 h-8" />
      <p class="text-black font-semibold mr-2 tracking-tight">Accedi</p>
    </button>
  </div>
</template>
