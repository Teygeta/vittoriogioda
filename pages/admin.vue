<script setup lang="ts">
import { CircleUser, Fingerprint, Home, ServerCog } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const instanceId = computed(() => route.params.instanceid as string)
</script>

<template>
  <div class="container w-full mx-auto">
    <div class="grid h-full py-4 lg:grid-cols-5 gap-x-4">
      <!-- Sidebar -->
      <div class="flex-col hidden h-full overflow-hidden lg:flex">
        <div class="flex flex-col justify-between flex-grow space-y-4">
          <div class="flex-grow space-y-4">
            <div>
              <div class="space-y-1">
                <NuxtLink custom :to="`/dashboard/instances/${instanceId}`" #="{ isExactActive , href, navigate }">
                  <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                    <Home class="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </NuxtLink>

                <NuxtLink custom :to="`/dashboard/instances/${instanceId}/users`" #="{ isExactActive , href, navigate }">
                  <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                    <CircleUser class="w-4 h-4 mr-2" />
                    Users
                  </Button>
                </NuxtLink>
              </div>
            </div>

            <div class="my-3 border-t" />

            <div>
              <h2 class="flex items-center px-4 mb-2 text-lg font-semibold tracking-tight">
                <Fingerprint class="w-5 h-5 mr-2" />
                User & Authentication
              </h2>
              <div class="ml-3">
                <NuxtLink custom :to="`/dashboard/instances/${instanceId}/user-and-auth/email-phone-username`" #="{ isExactActive , href, navigate }">
                  <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                    Email, Phone, Username
                  </Button>
                </NuxtLink>
                <NuxtLink custom :to="`/dashboard/instances/${instanceId}/user-and-auth/multi-factor`" #="{ isExactActive , href, navigate }">
                  <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                    Multi-factor
                  </Button>
                </NuxtLink>
                <NuxtLink custom :to="`/dashboard/instances/${instanceId}/user-and-auth/restrictions`" #="{ isExactActive , href, navigate }">
                  <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                    Restrictions
                  </Button>
                </NuxtLink>
                <NuxtLink custom :to="`/dashboard/instances/${instanceId}/user-and-auth/social-connections`" #="{ isExactActive , href, navigate }">
                  <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                    Social connections
                  </Button>
                </NuxtLink>
              </div>
            </div>

            <div class="my-3 border-t" />

            <div class="space-y-1">
              <NuxtLink custom :to="`/dashboard/instances/${instanceId}/sessions`" #="{ isExactActive , href, navigate }">
                <Button as="a" :variant="isExactActive ? 'secondary' : 'ghost'" class="justify-start w-full" :href="href" @click="navigate">
                  <ServerCog class="w-4 h-4 mr-2" />
                  Sessions
                </Button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 overflow-hidden lg:col-span-4">
        <div class="h-full overflow-auto">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
