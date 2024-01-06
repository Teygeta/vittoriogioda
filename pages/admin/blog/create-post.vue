<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()
const user = useAuthUser()

// implement shadcn form
const postContent = ref('')
async function createDraftPost() {
  try {
    await $trpc.admin.blog.createDraftPost.mutate({
      title: 'New Post',
      content: postContent.value,
      authorId: '1'
    })
  } catch (error) {

  }

}
</script>

<template>
  <div>
    {{ user }}
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Create
      </h2>
      <p class="text-muted-foreground">
        Create new post
      </p>
    </div>

    <Card class="p-5 mt-5">
      <TipTap ref="editor" v-model="postContent" @submit="createDraftPost" />
    </Card>

    <!-- <pre><code>{{ postContent }}</code></pre> -->

  </div>
</template>
