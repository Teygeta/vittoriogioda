<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Blog
      </h2>
      <p class="text-muted-foreground">
        Manage posts
      </p>

    </div>

    <Card class="p-5 mt-5">
      <TipTap />
    </Card>

  </div>
</template>
