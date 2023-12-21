<script setup lang="ts">
import type { NuxtError } from '#app'
import { Button } from '@/components/ui/button'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <main class="grid min-h-full px-6 py-24 place-items-center sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold">
        {{ error.statusCode }}
      </p>
      <h1 class="my-4 text-3xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <template v-if="true">
        {{ error.message }}
      </template>
      <div class="flex items-center justify-center mt-10 gap-x-6">
        <Button as="a" href="/">
          Go back home
        </Button>
      </div>
    </div>
  </main>
</template>
