<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()
const { signOut } = useAuth()

async function handleSignOut() {
  await signOut()
}

const createPostForm = reactive({
  content: '',
  title: 'New Post',
  authorId: 2
})


const isSubmitting = ref(false)

async function createNewPost() {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    await $trpc.blog.createPost.mutate(createPostForm)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    refreshNuxtData()
    isSubmitting.value = false
    createPostForm.content = ''
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto">

  </div>
</template>
