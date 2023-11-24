<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid/esm/index'

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <button
      class="rounded border border-transparent px-2.5 py-1.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
      aria-label="Theme" type="button" @click="isDark = !isDark">
      <MoonIcon v-if="isDark" class="flex-shrink-0 w-5 h-5" />
      <SunIcon v-else class="flex-shrink-0 w-5 h-5" />
    </button>

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
