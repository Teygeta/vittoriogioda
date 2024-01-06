<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()
const { data } = await $trpc.admin.users.paginateUsers.useQuery()

const users = computed(() => data.value?.users ?? [])
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Users
        </h2>
        <p class="text-muted-foreground">
          Manage users
        </p>
      </div>



      <Dialog>
        <DialogTrigger>
          <Button as-child>
            <div class="flex gap-2">
              <Plus :size="20" />
              Create new user
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New user details</DialogTitle>
            <DialogDescription>
              Dialog description for create user
            </DialogDescription>
          </DialogHeader>

          <div>
            <div class="grid w-full max-w-sm items-center gap-1.5">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="test@example.com" />
            </div>
          </div>


          <DialogFooter>
            <Button @click="createUser">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div v-for="user in users" :key="user.id">
      <nuxt-link :to="`/admin/users/${user.id}`">
        {{ user.email }}
      </nuxt-link>
    </div>
  </div>
</template>
