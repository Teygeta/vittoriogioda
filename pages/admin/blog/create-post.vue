<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

definePageMeta({
  middleware: ['auth', 'user-role'],
  layout: 'admin',
})

const { $trpc } = useNuxtApp()
const user = useAuthUser()
const { toast } = useToast()

const submitting = ref(false)

const postTitle = ref('')
const postContent = ref('')
async function createDraftPost() {
  submitting.value = true

  try {
    const post = await $trpc.admin.blog.createDraftPost.mutate({
      title: postTitle.value,
      content: postContent.value,
      authorId: user.value.id,
    })

    toast({
      title: '🎉Draft post created',
      description: 'Successfully created a new draft post, whaiting for publish',
    })

    submitting.value = false

    navigateTo(`/admin/blog/${post.id}`)
  }
  catch (e: any) {
    toast({
      title: '❌Error',
      description: e.message,
    })

    submitting.value = false
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
      <Input v-model="postTitle" class="text-xl font-bold tracking-tight" placeholder="Title" />
    </Card>
    <Card class="p-5 mt-5">
      <TipTap v-model="postContent" :submitting="submitting" @submit="createDraftPost" />
    </Card>
  </div>
</template>
