<script setup lang="ts">

const { data } = useFetch('/api/get-users')
</script>

<template>
  <main class="flex flex-1 justify-center items-center min-h-screen">
    <button
      class="border rounded py-5 px-8 dark:border-green-900/20 dark:bg-black/50 bg-white dark:hover:bg-black/10 hover:bg-white/50">
      <h2 class="font-bold text-xl">Login via GitHub</h2>
    </button>
  </main>
</template>
