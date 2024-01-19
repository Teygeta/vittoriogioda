<script setup lang="ts">
const { $trpc } = useNuxtApp()
const query = ref('')

const { data } = await $trpc.user.blog.paginatePosts.useQuery()

const posts = computed(() => data.value?.posts ?? [])

const filteredPosts = computed(() => {
  if (!query.value) return posts.value
  // filter posts by title and content
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
        <Input type="text" v-model.trim="query" placeholder="Cerca un post..." />
      </div>

      <nuxt-link v-if="filteredPosts.length > 0" v-for="post in filteredPosts" :key="post.id"
        class="px-6 py-3 transition rounded-md dark:hover:bg-opacity-10 dark:bg-white dark:bg-opacity-5"
        :to="`/blog/${post.id}`">
        <div>
          <h1 class="text-2xl font-semibold">
            {{ post.title }}
          </h1>
          <div class="post-container" v-html="post.content" />
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
