<script setup lang="ts">
import { useToast } from '~/components/ui/toast'
import { Terminal } from 'lucide-vue-next'


definePageMeta({
	middleware: ['auth', 'user-role'],
	layout: 'admin',
})

const route = useRoute()
const postId = computed(() => route.params.postId as string)

const { $trpc } = useNuxtApp()
const { data } = await $trpc.admin.blog.getPostById.useQuery({
	postId: postId.value,
})

const post = computed(() => data.value?.post ?? null)

useHead({
	title: post.value?.title,
})

const postContent = ref('')

const { toast } = useToast()

const submitting = ref(false)

async function updatePost() {
	try {
		submitting.value = true

		await $trpc.admin.blog.updatePost.mutate({
			postId: postId.value,
			content: postContent.value,
		})

		toast({
			title: '🎉Post updated',
			description: 'Successfully updated post',
		})

		submitting.value = false
	}
	catch (e: any) {
		toast({
			title: '❌Error',
			description: e.message,
		})
	}
}
</script>

<template>
	<div>
		<div v-if="post">
			<div class="space-y-0.5">
				<h2 class="text-2xl font-bold tracking-tight">
					Edit
				</h2>
				<p class="text-muted-foreground">
					Edit the post
				</p>
			</div>

			<Alert class="mt-5">
				<Terminal class="h-4 w-4" />
				<AlertTitle>Attention</AlertTitle>
				<AlertDescription>
					The post title cannot be changed
				</AlertDescription>
			</Alert>

			<Card class="p-5 mt-5">
				<TipTap v-model="postContent" :content="post.content || undefined" :submitting="submitting"
					@submit="updatePost" />
			</Card>
		</div>
	</div>
</template>
	