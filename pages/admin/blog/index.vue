<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()

const { data } = await $trpc.blog.paginatePosts.useQuery()
const posts = computed(() => data.value?.posts ?? [])

const postContent = ref('')
async function createDraftPost() {
  try {
    await $trpc.blog.createDraftPost.mutate({
      title: 'New Post',
      content: postContent.value,
      authorId: 'clqfazty00000v9zafeqh6jee'
    })
  } catch (error) {

  }

}
</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Blog
      </h2>
      <p class="text-muted-foreground">
        Manage posts
      </p>
    </div>

    <Card class="flex flex-col my-3 gap-4 p-5">
      <div class="border-b pb-2 flex justify-between items-center">
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
          Recent posts
        </h3>
        <Button class="flex gap-2">
          <Plus :size="20" />
          Add new
        </Button>
      </div>

      <Card class="p-4" v-for="post in posts" :key="post.id">
        <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
          {{ post.title }}
        </h4>
        <div class="text-ellipsis overflow-hidden max-h-16">
          <div class="post-container" v-html="post.content" />
        </div>
      </Card>
    </Card>
    <Card class="p-5 mt-5">
      <TipTap ref="editor" v-model="postContent" @submit="createDraftPost" />
    </Card>

    <!-- <pre><code>{{ postContent }}</code></pre> -->

  </div>
</template>
