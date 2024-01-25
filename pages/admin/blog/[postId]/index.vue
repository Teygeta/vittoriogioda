<script setup lang="ts">
import { format } from 'date-fns'
import { it } from 'date-fns/locale'

definePageMeta({
  middleware: ['auth', 'user-role'],
  layout: 'admin',
})

const route = useRoute()
const postId = computed(() => route.params.postId as string)

const { $trpc } = useNuxtApp()
const { data } = await $trpc.admin.blog.getPostById.useQuery({
  postId: postId.value,
})

const post = computed(() => data.value?.post)
</script>

<template>
  <div>
    <div v-if="post" class="space-y-0.5">
      <main class="max-w-4xl mx-auto">
        <div class="my-8">
          <h1 class="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {{ post.title }}
          </h1>
          <div class="font-mono text-gray-500">
            {{ post.author.name }},

            {{ format(post.createdAt, 'PPPP', { locale: it }).replace(/^\w/, (c) => c.toUpperCase()) }}
          </div>
        </div>

        <div class="post-container" v-html="post.content" />
      </main>
    </div>
  </div>
</template>
