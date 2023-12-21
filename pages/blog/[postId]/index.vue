<script setup lang="ts">
const route = useRoute()
const postId = computed(() => route.params.postId as string)
const { $trpc } = useNuxtApp()

const { data } = await $trpc.blog.getPostById.useQuery({
  postId: postId.value
})
</script>

<template>
  <div class="max-w-4xl mx-auto">
    {{ route.params.postId }}
  </div>
</template>
