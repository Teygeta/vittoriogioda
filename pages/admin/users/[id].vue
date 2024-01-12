<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const route = useRoute()
const userId = computed(() => route.params.id as string)

const { $trpc } = useNuxtApp()
const { data } = await $trpc.admin.users.getUserById.useQuery({
  userId: userId.value,
})
</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        User
      </h2>
      <pre class="text-muted-foreground">
        Manage users {{ data }}
      </pre>
    </div>
  </div>
</template>
