<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'user-role'],
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
      authorId: user.value.id,
    })
  }
  catch (error) {

  }
}
</script>

<template>
  <div>
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Create
      </h2>
      <p class="text-muted-foreground">
        Create new post
      </p>
    </div>

    <Card class="p-5 mt-5">
      <TipTap v-model="postContent" @submit="createDraftPost" />
    </Card>
  </div>
</template>
