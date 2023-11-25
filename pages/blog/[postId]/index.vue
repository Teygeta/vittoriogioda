<script setup lang="ts">
const id = ref(1)
const { data } = await useFetch(`/api/posts/${id.value}`, {
  server: false,
  watch: [id],
})

const post = computed(() => data.value)
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="post">
      <h1 class="text-4xl font-bold">{{ post?.title }}</h1>
      <div class="post-container" v-html="post.content"></div>
    </div>
  </div>
</template>
