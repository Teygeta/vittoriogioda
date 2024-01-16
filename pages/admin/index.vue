<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'admin',
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
  </div>
</template>
