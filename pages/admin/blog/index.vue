<script setup lang="ts">
import { format } from 'date-fns'
import type { inferProcedureInput } from '@trpc/server'
import { Plus, Settings } from 'lucide-vue-next'
import type { AppRouter } from '~/server/trpc/routers'

import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'

definePageMeta({
  middleware: ['auth', 'user-role'],
  layout: 'admin',
})

const filters = reactive<inferProcedureInput<AppRouter['admin']['blog']['paginatePosts']>>({
  showDeleted: false,
})

const { $trpc } = useNuxtApp()
const { data, refresh } = await $trpc.admin.blog.paginatePosts.useQuery(
  toRaw(filters),
)
const posts = computed(() => data.value?.posts ?? [])

watch(filters, () => refresh())

async function publishPost(postId: string) {
  try {
    await $trpc.admin.blog.publishPost.mutate({
      postId,
    })

    refresh()
  }
  catch (error) {

  }
}

async function unPublishPost(postId: string) {
  try {
    await $trpc.admin.blog.unPublishPost.mutate({
      postId,
    })

    refresh()
  }
  catch (error) {

  }
}

async function deletePost(postId: string) {
  try {
    await $trpc.admin.blog.deletePost.mutate({
      postId,
    })

    refresh()
  }
  catch (error) {

  }
}
</script>

<template>
  <div>
    <div>
      <h2 class="text-2xl font-bold tracking-tight">
        Blog
      </h2>
      <p class="text-muted-foreground">
        Manage posts
      </p>
    </div>

    <Card class="space-y-8 my-4 p-5">
      <div class="border-b pb-2 flex justify-between items-center">
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
          Recent posts
        </h3>
        <Button as-child>
          <NuxtLink to="/admin/blog/create-post" class="flex gap-2">
            <Plus :size="20" />
            Create
          </NuxtLink>
        </Button>
      </div>

      <Card class="p-5">
        <div class="flex items-center space-x-2">
          <Checkbox id="terms" @update:checked="filters.showDeleted = $event" />
          <label
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show deleted posts
          </label>
        </div>
      </Card>

      <Card v-for="post in posts" :key="post.id" class="p-4 space-y-5">
        <div class="flex justify-between">
          <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            {{ post.title }}
            <Badge v-if="!post.published && !post.deletedAt" class="ml-1" variant="secondary">
              Not published
            </Badge>
            <Badge v-else-if="post.published && !post.deletedAt" class="ml-1">
              Published
            </Badge>
            <Badge v-if="post.deletedAt" class="ml-1" variant="destructive">
              Deleted
            </Badge>
          </h4>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings :size="22" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NuxtLink :to="`/admin/blog/edit/${post.id}`">
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </NuxtLink>
              <DropdownMenuItem v-if="post.published" @click="() => unPublishPost(post.id)">
                Hide
              </DropdownMenuItem>
              <DropdownMenuItem v-else @click="() => publishPost(post.id)">
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem @click="() => deletePost(post.id)">
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <NuxtLink :to="`/blog/${post.id}`">
                <DropdownMenuItem>
                  Read
                </DropdownMenuItem>
              </NuxtLink>
              <NuxtLink :to="`/admin/users/${post.authorId}`">
                <DropdownMenuItem>
                  Author
                </DropdownMenuItem>
              </NuxtLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div class="text-ellipsis overflow-hidden max-h-16">
          <div class="post-container" v-html="post.content" />
        </div>

        <div class="flex gap-2">
          <p class="text-sm text-muted-foreground italic">
            {{ format(new Date(post.createdAt), 'dd/MM/yyyy') }} - {{ post.author.name || 'Unknown' }}
          </p>
        </div>
      </Card>
    </Card>

    <!-- <pre><code>{{ postContent }}</code></pre> -->
  </div>
</template>
