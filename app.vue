<script setup lang="ts">
useSeoMeta({
  title: 'Vittorio Gioda',
  description: 'Web developer. Mi piace creare app utili e belle da vedere; ogni tanto faccio qualche sito per le attività commerciali. Sono appassionato di cucina e di biohaking.',
  ogTitle: 'Vittorio Gioda',
  ogDescription: 'Web developer. Mi piace creare app utili e belle da vedere; ogni tanto faccio qualche sito per le attività commerciali. Sono appassionato di cucina e di biohaking.',
  ogImage: '',
  ogUrl: 'www.vittoriogioda.it',
})

useHead({
  htmlAttrs: {
    lang: 'it',
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
