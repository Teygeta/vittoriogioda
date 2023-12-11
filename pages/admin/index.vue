<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline"
import type { Post } from '@prisma/client'

const { $trpc } = useNuxtApp()
const { status, signOut } = useAuth()

const isNotSignedIn = computed(() => status.value === 'unauthenticated')

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


// async function deletePost(postId: Post['id']) {
//   try {
//     await useFetch('/api/posts/delete-post', {
//       method: 'POST',
//       body: {
//         postId
//       }
//     })
//     createPostForm.content = ''

//   } catch (error) {
//     console.error(error)
//   }
//   finally {
//     refreshNuxtData()
//   }
// }
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <template v-if="isNotSignedIn">
      <h1>Unauthorized</h1>
    </template>
    <template v-else>
      <h1 class="text-4xl font-bold">Admin</h1>

      <button @click="handleSignOut">Sign Out</button>

      <div>
        <div>
          <textarea class="focus:outline-none bg-black" v-model="createPostForm.content" />
          <button type="button" @click="createNewPost">Create Post</button>
        </div>

        <!-- <template v-if="posts">
          <div class="my-10">
            <h2 class="text-xl font-bold">
              Posts list
            </h2>
            <ul class="rounded-md p-3 bg-neutral-800 divide-y-2 divide-neutral-700">
              <li class="flex justify-between items-center gap-2" v-for="post in posts" :key="post.id">
                <div>
                  <p>{{ post.title }}</p>
                  <p>{{ post.content }}</p>
                </div>
                <div>
                  <button type="button" @click="deletePost(post.id)">
                    <XCircleIcon class="w-7 text-red-500 hover:text-red-400" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </template> -->

      </div>
    </template>
  </div>
</template>
