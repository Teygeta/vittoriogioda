<script setup lang="ts">
import { Home, BookOpen, Wrench, Camera  } from 'lucide-vue-next'
</script>
<template>
  <main class="flex flex-col min-h-screen">
    <nav
      class="sticky top-0 z-50 flex items-center justify-between w-full max-w-6xl p-5 mx-auto backdrop-blur-md bg-opacity-40">
      <div>
        <ul class="flex items-center gap-8">
          <li>
            <NuxtLink
              class="rounded flex gap-2 items-center border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/">
              <Home :size="20" :stroke-width="2.2" />
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="rounded flex gap-2 items-center border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/tools">
              <Wrench :size="20" :stroke-width="2.2" />
              Tools
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="rounded flex gap-2 items-center border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/blog">
              <BookOpen  :size="20" :stroke-width="2.2" />
              Blog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="rounded flex gap-2 items-center border border-transparent p-2.5 text-gray-800 hover:border-gray-500/10 hover:bg-gray-200/30 dark:text-gray-200 dark:hover:bg-gray-800/30"
              to="/blog">
              <Camera  :size="20" :stroke-width="2.2" />
              Photos
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <ToggleLightDarkButton />
      </div>
    </nav>

    <div class="flex flex-col justify-center flex-1 px-4 sm:px-8">
      <slot />
    </div>

    <footer>

  </footer>
</main></template>
