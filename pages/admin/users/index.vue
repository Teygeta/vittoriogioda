<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import { useForm } from 'vee-validate'

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})


const { $trpc } = useNuxtApp()
const { data, refresh } = await $trpc.admin.users.paginateUsers.useQuery()

const users = computed(() => data.value?.users ?? [])

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const createUser = handleSubmit(async (values) => {

  try {
    const data = await $trpc.admin.users.createUser.query(values)

    refresh()

  } catch (error) {
    // TODO: handle error
  }

})

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

          <form class="w-2/3 space-y-6" @submit="createUser">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="example@text.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit">
              Create
            </Button>
          </Form>



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
