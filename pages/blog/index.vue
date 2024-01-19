<script setup lang="ts">
import { format } from 'date-fns'

const { $trpc } = useNuxtApp()
const query = ref('')

const { data } = await $trpc.user.blog.paginatePosts.useQuery()

const posts = computed(() => data.value?.posts ?? [])

const filteredPosts = computed(() => {
  if (!query.value) { return posts.value }
  return posts.value.filter((post) => {
    const title = post.title.toLowerCase()
    const content = post.content?.toLowerCase()
    const q = query.value.toLowerCase()
    return title.includes(q) || content?.includes(q)
  })
})
</script>

<template>
  <main>
    <div class="flex flex-col max-w-3xl gap-5 mx-auto">
      <div>
        <Input v-model.trim="query" type="text" placeholder="Cerca un post..." />
      </div>

      <nuxt-link
        v-for="post in filteredPosts" v-if="filteredPosts.length > 0" :key="post.id"
        class="px-6 py-3 transition rounded-md dark:hover:bg-opacity-10 dark:bg-white dark:bg-opacity-5"
        :to="`/blog/${post.id}`"
      >
        <div>
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-semibold">
              {{ post.title }}
            </h1>
            <div class="font-mono text-gray-500">
              {{ format(post.createdAt, 'P') }}
            </div>
          </div>

          <div class="max-h-[150px] overflow-hidden">
            <div class="post-container" v-html="post.content" />
          </div>
        </div>
      </nuxt-link>

      <div v-else class="text">
        <p class="text-sm text-muted-foreground">
          Nessun post trovato
        </p>
      </div>
    </div>
  </main>
</template>
