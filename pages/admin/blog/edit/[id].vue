<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const route = useRoute()
const postId = computed(() => route.params.id as string)

const { $trpc } = useNuxtApp()
const { data } = await $trpc.admin.blog.getPostById.useQuery({
  postId: postId.value
})

const post = computed(() => data.value?.post)
</script>

<template>
  <div>
    <div v-if="post" class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Edit
      </h2>
      <p class="text-muted-foreground">
        Edit post {{ data }}
      </p>
    </div>
  </div>
</template>
