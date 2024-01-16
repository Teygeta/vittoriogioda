<script setup lang="ts">
import { BookOpen, Camera, Github, Home, Mail, Wrench } from 'lucide-vue-next'

const { $trpc } = useNuxtApp()

async function sendEmail() {
  try {
    const data = await $trpc.user.resend.sendEmail.query()
  }
  catch (error) {
  }
}

const navigationItems = computed(() => {
  return [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
  ]
})
</script>

<template>
  <div>
    <main class="flex flex-col justify-between min-h-screen">
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
              <NuxtLink v-slot="{ href, navigate, isExactActive }" custom to="/tools">
                <Button class="!flex !gap-2 !items-center" variant="ghost" v-bind="$attrs" :href="href"
                  :class="{ 'bg-neutral-800/70': isExactActive }" @click="navigate">
                  <Wrench :size="20" :stroke-width="2.2" />
                  <span class="hidden sm:inline-block">
                    Tools
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
            <!-- <li>
              <NuxtLink v-slot="{ href, navigate, isExactActive }" custom to="/photos">
                <Button class="!flex !gap-2 !items-center" variant="ghost" v-bind="$attrs" :href="href"
                  :class="{ 'bg-neutral-800/70': isExactActive }" @click="navigate">
                  <Camera :size="20" :stroke-width="2.2" />
                  Photos
                </Button>
              </NuxtLink>
            </li> -->
          </ul>
        </div>

        <div>
          <ToggleLightDarkButton />
        </div>
      </nav>

      <div class="flex flex-col justify-center flex-1 px-4 sm:px-8">
        <slot />
      </div>

      <footer class="flex justify-center py-5 z-10">
        <div>
          <Button variant="ghost" class="w-fit mx-auto mt-10" @click="sendEmail">
            <Mail :size="20" />
          </Button>
          <Button variant="ghost" class="w-fit mx-auto mt-10" as-child @click="() => console.log('ok')">
            <a href="https://www.github.com/Teygeta" target="_blank">
              <Github :size="20" />
            </a>
          </Button>
        </div>
      </footer>
    </main>
  </div>
</template>
