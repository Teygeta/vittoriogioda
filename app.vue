<script setup lang="ts">
useSeoMeta({
  title: 'teygenesis',
  description: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  ogUrl: '',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <Toaster />
    </NuxtLayout>
  </div>
</template>
