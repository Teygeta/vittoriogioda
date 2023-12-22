<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data } = await $trpc.blog.paginatePosts.useQuery()

const posts = computed(() => data.value?.posts ?? [])
</script>

<template>
  <main>
    <div class="flex flex-col max-w-3xl gap-5 mx-auto">
      <nuxt-link class="px-6 py-3 transition rounded-md dark:hover:bg-opacity-10 dark:bg-white dark:bg-opacity-5"
        v-for="post in posts" :key="post.id" :to="`/blog/${post.id}`">
        <div>
          <h1 class="text-2xl font-semibold">{{ post.title }}</h1>
          <div class="post-container" v-html="post.content" />
        </div>
      </nuxt-link>
    </div>

  </main>
</template>
