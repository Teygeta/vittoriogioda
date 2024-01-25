<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
})

const authUser = useAuthUser()

const { $trpc } = useNuxtApp()
const { data, refresh } = await $trpc.admin.users.getUserById.useQuery({
  userId: authUser.value.id,
})

const user = computed(() => data.value?.user || null)

const { toast } = useToast()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const submitting = ref(false)

const onSubmit = handleSubmit(async (values) => {
  if (submitting.value) {
    return
  }

  submitting.value = true

  try {
    await $trpc.admin.users.changUserDetails.mutate({
      userId: authUser.value.id,
      name: values.name,
    })

    await refresh()

    toast({
      title: 'Name changed successfully!',
    })

    submitting.value = false
  }
  catch (e: any) {
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
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage personal information
      </p>
    </div>
    <template v-if="user">
      <div class="space-y-8 my-10">
        <Card class="flex items-start p-8">
          <div class="flex-1">
            <h3 class="text-lg font-semibold flex gap-2 items-center">
              Profile
              <Badge v-if="user?.banned" variant="destructive">
                Banned
              </Badge>
            </h3>
            <p class="text-sm text-muted-foreground">
              User details and settings
            </p>
          </div>
          <div class="flex-1">
            <ul class="space-y-5">
              <li class="flex justify-between">
                <h3 class="block text-sm tracking-tight font-medium text-foreground text-left">
                  Photo
                </h3>
                <Avatar size="sm" class="h-16 w-16">
                  <AvatarImage :src="user.image || ''" alt="U" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
              </li>
              <li>
                <h3 class="block text-sm tracking-tight font-medium text-foreground text-left">
                  Email
                </h3>
                <p class="text-sm text-muted-foreground">
                  {{ user.email || '(none)' }}
                </p>
              </li>
              <li>
                <h3 class="block text-sm tracking-tight font-medium text-foreground text-left">
                  Name
                </h3>
                <p class="text-sm text-muted-foreground">
                  {{ user.name || '(none)' }}
                </p>
              </li>
              <li>
                <h3 class="block text-sm tracking-tight font-medium text-foreground text-left">
                  Created at
                </h3>
                <p class="text-sm text-muted-foreground">
                  {{ format(user.createdAt, 'P') || '(none)' }}
                </p>
              </li>
            </ul>
          </div>
        </Card>

        <Card class="flex items-start p-8">
          <div class="flex-1">
            <h3 class="text-lg font-semibold flex gap-2 items-center">
              Edit
              <Badge v-if="user?.banned" variant="destructive">
                Banned
              </Badge>
            </h3>
            <p class="text-sm text-muted-foreground">
              Edit personal details
            </p>
          </div>
          <div class="flex-1">
            <ul class="space-y-5">
              <li class="flex justify-between">
                <form class="w-2/3 space-y-6" @submit="onSubmit">
                  <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" :default-value="user.name || undefined" placeholder="User name"
                          v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <AlertDialog>
                    <AlertDialogTrigger as-child>
                      <Button>
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="[submitting ? '' : 'hidden']" />
                        Confirm
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to change the username. This action is permanent and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" @click="onSubmit">
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Form>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </template>

    <template v-else>
      ❌Error
    </template>
  </div>
</template>
