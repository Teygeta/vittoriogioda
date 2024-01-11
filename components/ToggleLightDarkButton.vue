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
  <div>
    <ClientOnly>
      <Button variant="ghost" @click="isDark = !isDark">
        <MoonIcon v-if="isDark" class="flex-shrink-0 w-5 h-5 group-hover:rotate-[20deg] transition" />
        <SunIcon v-else class="flex-shrink-0 w-5 h-5 group-hover:rotate-[20deg] transition" />
      </Button>

      <template #fallback>
        <div class="w-8 h-8" />
      </template>
    </ClientOnly>
  </div>
</template>
