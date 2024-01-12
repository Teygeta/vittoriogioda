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
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage settings
      </p>
    </div>
  </div>
</template>
