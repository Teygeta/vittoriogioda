<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()
const postContent = ref('')
async function createDraftPost() {
try {
  console.log(postContent.value)
  // await $trpc.blog.createDraftPost.mutate({
  //   title: 'New Post',
  //   content: postContent.value,
  //   authorId: 'clqfazty00000v9zafeqh6jee'
  // })
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

    <Card class="p-5 mt-5">
      <TipTap />
    </Card>

    <Button @click="createDraftPost()">
      Crea
    </Button>

    <pre><code>{{ postContent }}</code></pre>

  </div>
</template>
