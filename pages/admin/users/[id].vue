<script setup lang="ts">
import { format } from 'date-fns'
import { useToast } from '@/components/ui/toast/use-toast'
import { Loader2, Plus, Trash2, UserRound } from 'lucide-vue-next'


definePageMeta({
  middleware: ['auth', 'user-role'],
  layout: 'admin',
})

const route = useRoute()
const userId = computed(() => route.params.id as string)

const { $trpc } = useNuxtApp()
const { data, refresh } = await $trpc.admin.users.getUserById.useQuery({
  userId: userId.value,
})

const user = computed(() => data.value?.user || null)

const submitting = ref(false)

const banAlertOpen = ref(false)
const unbanAlertOpen = ref(false)
const deleteAlertOpen = ref(false)

const { toast } = useToast()

async function deleteUser() {
  if (submitting.value) {
    return
  }

  submitting.value = true

  try {
    await $trpc.admin.users.deleteUser.mutate({
      userId: userId.value,
    })

    await refresh()

    toast({
      title: 'User deleted',
      description: 'The user has been successfully deleted.',
    })
  }
  catch (e: any) {
    toast({
      title: 'Error',
      description: e.message,
    })
  }
  finally {
    submitting.value = false
    close()
  }
}

async function banUser() {
  if (submitting.value) {
    return
  }

  submitting.value = true

  try {
    await $trpc.admin.users.banUser.mutate({
      userId: userId.value,
    })

    await refresh()

    toast({
      title: 'User banned',
      description: 'The user has been successfully banned.',
    })
  }
  catch (e: any) {
    toast({
      title: 'Error',
      description: e.message,
    })
  }
  finally {
    submitting.value = false
    close()
  }
}

async function unbanUser() {
  if (submitting.value) {
    return
  }

  submitting.value = true

  try {
    await $trpc.admin.users.unbanUser.mutate({
      userId: userId.value,
    })

    await refresh()

    toast({
      title: 'User unbanned',
      description: 'The user has been successfully unbanned.',
    })
  }
  catch (e: any) {
    toast({
      title: 'Error',
      description: e.message,
    })
  }
  finally {
    submitting.value = false
    close()
  }
}

</script>

<template>
  <div>
    <template v-if="user">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">
          User
        </h2>
        <pre class="text-muted-foreground">
        Manage users {{ data }}
        </pre>
      </div>

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
              <li>
                <h3 class="block text-sm tracking-tight font-medium text-foreground text-left">
                  Id
                </h3>
                <p class="text-sm text-muted-foreground">
                  {{ user.id || '(none)' }}
                </p>
              </li>
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

        <Card v-if="!user.banned" class="flex items-start p-8">
          <div class="flex-1">
            <h3 class="text-lg font-semibold">
              Ban user
            </h3>
            <p class="text-sm text-muted-foreground">
              This action makes a user unable to sign in and clears all their active sessions
            </p>
          </div>
          <div>
            <Button variant="destructive" @click="banAlertOpen = true">
              <UserRound class="w-5 h-5" />
              <p class="ml-2">
                Ban
              </p>
            </Button>
          </div>
        </Card>

        <Card v-else class="flex items-start p-8">
          <div class="flex-1">
            <h3 class="text-lg font-semibold">
              Unban user
            </h3>
            <p class="text-sm text-muted-foreground">
              This action makes a user able to sign in again
            </p>
          </div>
          <div>
            <Button variant="destructive" @click="unbanAlertOpen = true">
              <UserRound class="w-5 h-5" />
              <p class="ml-2">
                Unban
              </p>
            </Button>
          </div>
        </Card>
      </div>
    </template>

    <!-- Delete -->
    <AlertDialog v-model:open="deleteAlertOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete user from your application
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user? <br>
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="submitting">
            Cancel
          </AlertDialogCancel>
          <Button :disabled="submitting" variant="destructive" @click="deleteUser">
            <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
            Delete User
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Ban -->
    <AlertDialog v-model:open="banAlertOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Ban user
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to ban this user? <br>
            This action is not permanent and can be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="submitting">
            Cancel
          </AlertDialogCancel>
          <Button :disabled="submitting" variant="destructive" @click="banUser">
            <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
            Ban User
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <!-- Unban -->
    <AlertDialog v-model:open="unbanAlertOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Unban user
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to unban this user? <br>
            This action is not permanent and can be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel :disabled="submitting">
            Cancel
          </AlertDialogCancel>
          <Button :disabled="submitting" variant="destructive" @click="unbanUser">
            <Loader2 v-if="submitting" class="w-4 h-4 mr-2 animate-spin" />
            Unban User
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
