<script setup lang="ts">
const router = useRouter()
const { status, signOut } = useAuth()

const isNotSignedIn = computed(() => status.value === 'unauthenticated')

async function handleSignOut() {
  await signOut()
}

const createPostForm = reactive({
  content: ''
})

async function createNewPost() {
  try {
    await useFetch('/api/posts/create-post', {
      body: {
        content: createPostForm.content
      }
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="mx-auto">
    <template v-if="isNotSignedIn">
      <h1>Unauthorized</h1>
    </template>
    <template v-else>
      <h1 class="text-4xl font-bold">Admin</h1>

      <button @click="handleSignOut">Sign Out</button>

      <div>
        <form @submit.prevent="createNewPost">
          <textarea class="focus:outline-none bg-black" v-model="createPostForm.content" />
          <button type="submit">Create Post</button>
        </form>

      </div>
    </template>
  </div>
</template>
