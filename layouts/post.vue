<script setup lang="ts">
import { BookOpen, Github, Home, Mail } from 'lucide-vue-next'

const { $trpc } = useNuxtApp()

</script>

<template>
  <div>
    <main class="flex flex-col">
      <nav
        class="sticky top-0 z-50 flex items-center justify-between w-full max-w-6xl p-5 mx-auto backdrop-blur-md bg-opacity-40">
        <div>
          <ul class="flex items-center gap-8">
            <li>
              <NuxtLink v-slot="{ href, navigate, isExactActive }" custom to="/">
                <Button class="!flex !gap-2 !items-center" variant="ghost" v-bind="$attrs" :href="href"
                  :class="{ 'bg-neutral-800/70': isExactActive }" @click="navigate">
                  <Home :size="20" :stroke-width="2.2" />
                  <span class="hidden sm:inline-block">
                    Home
                  </span>
                </Button>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink v-slot="{ href, navigate, isExactActive }" custom to="/blog">
                <Button class="!flex !gap-2 !items-center" variant="ghost" v-bind="$attrs" :href="href"
                  :class="{ 'bg-neutral-800/70': isExactActive }" @click="navigate">
                  <BookOpen :size="20" :stroke-width="2.2" />
                  <span class="hidden sm:inline-block">
                    Blog
                  </span>
                </Button>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <ToggleLightDarkButton />
        </div>
      </nav>

      <div class="px-4 sm:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>
