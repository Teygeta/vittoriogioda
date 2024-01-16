<script setup lang="ts">
import { Button } from '@/components/ui/button'

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
  <div>
    <div class="flex justify-center">
      <Button @click="handleSignIn">
        <img src="~/assets/img/google-logo.png" alt="Google" class="w-8 h-8">
        <p class="mr-2">
          Accedi
        </p>
      </Button>
    </div>
  </div>
</template>
