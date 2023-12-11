<script setup lang="ts">
const { $client } = useNuxtApp()

const { data } = await $client.blog.paginatePost.useQuery()

const posts = computed(() => data.value?.post ?? [])
</script>

<template>
  <main>
    <div class="flex flex-col max-w-3xl mx-auto gap-5">
      <nuxt-link class="transition dark:hover:bg-opacity-10 dark:bg-white dark:bg-opacity-5 py-3 px-6 rounded-md"
        v-for="post in posts" :key="post.id" :to="`/blog/${post.id}`">
        <div>
          <h1 class="font-semibold text-2xl">{{ post.title }}</h1>
          <div class="post-container" v-html="post.content" />
        </div>
      </nuxt-link>
    </div>

  </main>
</template>
