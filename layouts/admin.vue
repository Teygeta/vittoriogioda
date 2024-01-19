<script setup lang="ts">
import { BookOpen, CircleUser, Home, Power, Settings } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const { signOut } = useAuth()

const user = useAuthUser()

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div>
    <div class="container w-full mx-auto my-10">
      <div class="flex justify-between">
        <div>
          <h2 class="pb-2 text-3xl font-bold tracking-tight transition-colors scroll-m-20 first:mt-0">
            Admin section
          </h2>
          <div class="flex gap-2">
            <span class="font-medium text-sm text-neutral-400">{{ user.name }}</span>
            <span
              v-if="user.role === 'ADMIN'"
              class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300"
            >
              {{ user.role }}
            </span>
            <span
              v-else-if="user.role === 'USER'"
              class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {{ user.role }}
            </span>
            <span
              v-else-if="user.role === 'AUTHOR'"
              class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300"
            >
              {{ user.role }}
            </span>
            <span
              v-else-if="user.role === 'MODERATOR'"
              class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              {{ user.role }}
            </span>
            <span v-else />
          </div>
        </div>

        <div class="flex gap-2">
          <div>
            <ToggleLightDarkButton />
          </div>

          <Button as-child>
            <NuxtLink to="/">
              <Home :size="15" />
            </NuxtLink>
          </Button>

          <Button variant="destructive" @click="signOut">
            <Power :size="15" />
          </Button>
        </div>
      </div>

      <div class="border-t my-2" />

      <div class="grid h-full py-4 lg:grid-cols-5 gap-x-4">
        <!-- Sidebar -->
        <template v-if="user.role">
          <div class="flex-col hidden h-full overflow-hidden lg:flex">
            <div class="flex flex-col justify-between flex-grow space-y-4">
              <div class="flex-grow space-y-4">
                <div class="space-y-1">
                  <NuxtLink custom to="/admin" #="{ isExactActive, href, navigate }">
                    <Button
                      as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full"
                      :href="href" @click="navigate"
                    >
                      <Home class="w-4 h-4 mr-2" />
                      Home
                    </Button>
                  </NuxtLink>

                  <NuxtLink custom to="/admin/blog" #="{ isExactActive, href, navigate }">
                    <Button
                      as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full"
                      :href="href" @click="navigate"
                    >
                      <BookOpen class="w-4 h-4 mr-2" />
                      Blog
                    </Button>
                  </NuxtLink>

                  <!-- <NuxtLink custom to="/admin/photos" #="{ isExactActive, href, navigate }">
                    <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full"
                      :href="href" @click="navigate">
                      <Camera class="w-4 h-4 mr-2" />
                      Photos
                    </Button>
                  </NuxtLink> -->

                  <NuxtLink custom to="/admin/users" #="{ isExactActive, href, navigate }">
                    <Button
                      as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full"
                      :href="href" @click="navigate"
                    >
                      <CircleUser class="w-4 h-4 mr-2" />
                      Users
                    </Button>
                  </NuxtLink>

                  <div class="border-t" />

                  <NuxtLink custom to="/admin/settings" #="{ isExactActive, href, navigate }">
                    <Button
                      as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full"
                      :href="href" @click="navigate"
                    >
                      <Settings class="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div class="col-span-3 overflow-hidden lg:col-span-4">
          <div class="h-full overflow-auto">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
