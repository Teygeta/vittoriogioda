<script setup lang="ts">
import { Power, BookOpen, Settings, CircleUser, Home, Camera } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

const { signOut } = useAuth()
const { data } = useAuth()

const user = useAuthUser()

definePageMeta({
  layout: 'admin',
})

</script>

<template>
  <div class="container w-full mx-auto my-10">
    <div class="flex justify-between">
      <h2 class="pb-2 text-3xl font-bold tracking-tight transition-colors scroll-m-20 first:mt-0">
        Admin <span class="font-medium text-sm ml-2 text-neutral-400">{{ user.name }} - {{ user.id }}</span>
      </h2>
      <div class="flex gap-2">
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


    <div class="grid h-full py-4 lg:grid-cols-5 gap-x-4">

      <!-- Sidebar -->
      <div class="flex-col hidden h-full overflow-hidden lg:flex">
        <div class="flex flex-col justify-between flex-grow space-y-4">
          <div class="flex-grow space-y-4">
            <div class="space-y-1">
              <NuxtLink custom to="/admin" #="{ isExactActive, href, navigate }">
                <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href"
                  @click="navigate">
                  <Home class="w-4 h-4 mr-2" />
                  Home
                </Button>
              </NuxtLink>

              <NuxtLink custom to="/admin/blog" #="{ isExactActive, href, navigate }">
                <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href"
                  @click="navigate">
                  <BookOpen class="w-4 h-4 mr-2" />
                  Blog
                </Button>
              </NuxtLink>

              <NuxtLink custom to="/admin/photos" #="{ isExactActive, href, navigate }">
                <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href"
                  @click="navigate">
                  <Camera class="w-4 h-4 mr-2" />
                  Photos
                </Button>
              </NuxtLink>

              <NuxtLink custom to="/admin/users" #="{ isExactActive, href, navigate }">
                <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href"
                  @click="navigate">
                  <CircleUser class="w-4 h-4 mr-2" />
                  Users
                </Button>
              </NuxtLink>

              <div class="border-t"></div>

              <NuxtLink custom to="/admin/settings" #="{ isExactActive, href, navigate }">
                <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href"
                  @click="navigate">
                  <Settings class="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 overflow-hidden lg:col-span-4">
        <div class="h-full overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
