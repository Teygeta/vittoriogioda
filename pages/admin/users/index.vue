<script setup lang="ts">
import { format } from 'date-fns'
import { Plus, User } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  middleware: ['auth', 'user-role'],
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
  }
  catch (error) {
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

    <Card class="my-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Name
            </TableHead>
            <TableHead>
              Email
            </TableHead>
            <TableHead>
              Role
            </TableHead>
            <TableHead>
              Created at
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="user in users" :key="user.id">
            <TableCell class="font-medium flex items-center gap-2">
              <Avatar size="sm" class="h-8 w-8">
                <AvatarImage :src="user.image || ''" alt="U" />
                <AvatarFallback>
                  <User :size="20" />
                </AvatarFallback>
              </Avatar>
              {{ user.name }}
              <Badge v-if="user.banned" variant="destructive">
                Banned
              </Badge>
            </TableCell>
            <TableCell>
              {{ user.email }}
            </TableCell>
            <TableCell>
              <span v-if="user.role === 'ADMIN'"
                class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                {{ user.role }}
              </span>
              <span v-else-if="user.role === 'USER'"
                class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {{ user.role }}
              </span>
              <span v-else-if="user.role === 'AUTHOR'"
                class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {{ user.role }}
              </span>
              <span v-else-if="user.role === 'MODERATOR'"
                class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {{ user.role }}
              </span>
              <span v-else />
            </TableCell>
            <TableCell>
              {{ format(user.createdAt, 'P') }}
            </TableCell>
            <TableCell class="text-center">
              <Button as-child variant="outline">
                <NuxtLink :to="`/admin/users/${user.id}`">
                  Details
                </NuxtLink>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  </div>
</template>
