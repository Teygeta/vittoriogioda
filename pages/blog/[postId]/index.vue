<script setup lang="ts">
import { it } from 'date-fns/locale'
import { format } from 'date-fns'
import { PencilLine } from 'lucide-vue-next'

definePageMeta({
  layout: 'post',
})

const route = useRoute()
const postId = computed(() => route.params.postId as string)
const { $trpc } = useNuxtApp()

const { data } = await $trpc.user.blog.getPostById.useQuery({
  postId: postId.value,
})

const post = computed(() => data.value?.post)

useHead({
  title: post.value?.title,
})

</script>

<template>
  <div>
    <main v-if="post && post.published" class="max-w-4xl mx-auto">
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

    <main v-else class="grid min-h-full px-6 py-24 place-items-center sm:py-32 lg:px-8">
      <div class="text-center">
        <h1 class="my-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <div class="flex items-center justify-center mt-10 gap-x-6">
          <Button as="a" href="/">
            Go back home
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>
