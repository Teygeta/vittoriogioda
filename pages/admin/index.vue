<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'
import type { AppRouter } from '~/server/trpc/routers'
import type { inferProcedureInput } from '@trpc/server'

type UserRole = inferProcedureInput<AppRouter['admin']['resend']['sendRoleRequest']>['role']

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const userRoles: UserRole[] = ['AUTHOR', 'MODERATOR']

const { toast } = useToast()
const user = useAuthUser()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    // @ts-expect-error
    role: z.enum(Object.keys(UserRole) as [keyof typeof UserRole]),
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { $trpc } = useNuxtApp()
const submitting = ref(false)
const submitRoleRequest = handleSubmit(async (values) => {
  try {
    if (submitting.value) {
      return
    }

    submitting.value = true

    await $trpc.admin.resend.sendRoleRequest.query({
      email: values.email,
      // @ts-expect-error
      role: values.role,
      userId: user.value.id,
    })

    submitting.value = false

    toast({
      title: 'Role request sent',
    })

    window.location.reload()
  }
  catch (e: any) {
    submitting.value = false

    toast({
      title: '❌Error',
      description: e.message,
    })
  }
})
</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Home
      </h2>
      <p class="text-xl text-muted-foreground">
        Here, administrators have complete control over user management, authors can create and publish new posts, and
        moderators oversee and manage content.
      </p>
    </div>
    <template v-if="user.role === 'PENDING'">
      <Card class="text-center my-10 max-w-[70%] mx-auto px-10 pb-10">
        <h4 class="scroll-m-20 mt-5 text-xl font-semibold tracking-tight">
          Role required
        </h4>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
          Your role is currently pending. Wait for an administrator to assign you the role.
        </p>
      </Card>
    </template>

    <template v-if="!user.role">
      <Card class="text-center my-10 max-w-[70%] mx-auto px-10 pb-10">
        <h4 class="scroll-m-20 mt-5 text-xl font-semibold tracking-tight">
          Require a role.
        </h4>
        <p class="leading-7 [&:not(:first-child)]:mt-6">
          Enter your email and the role you want to request. Wait for an administrator to assign you the role.
        </p>

        <form class="mx-auto w-2/4 space-y-6" @submit="submitRoleRequest">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="example@text.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="role">
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem v-for="(role, index) in userRoles" :key="index" :value="role || ''">
                        <span v-if="role === 'ADMIN'"
                          class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                          {{ role }}
                        </span>
                        <span v-else-if="role === 'USER'"
                          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {{ role }}
                        </span>
                        <span v-else-if="role === 'AUTHOR'"
                          class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-300">
                          {{ role }}
                        </span>
                        <span v-else-if="role === 'MODERATOR'"
                          class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                          {{ role }}
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" @click="submitRoleRequest">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="[submitting ? '' : 'hidden']" />

            Request role
          </Button>
        </Form>
      </Card>
    </template>
  </div>
</template>
