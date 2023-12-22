<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()
const { data } = await $trpc.users.paginateUsers.useQuery()
</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Users
      </h2>
      <p class="text-muted-foreground">
        Manage users
      </p>
    </div>
  </div>
</template>
