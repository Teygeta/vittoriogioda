<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const route = useRoute()
const userId = computed(() => route.params.id as string)

const { $trpc } = useNuxtApp()
const { data } = await $trpc.admin.users.getUserById.useQuery({
  userId: userId.value
})
</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Users
      </h2>
      <p class="text-muted-foreground">
        Manage users {{ data }}
      </p>
    </div>
  </div>
</template>