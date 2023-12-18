<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    {{ route.params.postId }}
  </div>
</template>
