<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})
</script>

<template>
  <div>
    Images
    <input type="file">
  </div>
</template>
