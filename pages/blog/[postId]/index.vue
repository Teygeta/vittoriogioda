<script setup lang="ts">
const route = useRoute()
const postId = computed(() => route.params.postId as string)
const { $trpc } = useNuxtApp()

const { data } = await $trpc.user.blog.getPostById.useQuery({
  postId: postId.value,
})

const post = computed(() => data.value?.post)
</script>

<template>
  <div v-if="post" class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-semibold">
      {{ post.title }}
    </h1>
    <div class="post-container" v-html="post.content" />
  </div>
</template>
