<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const { $trpc } = useNuxtApp()

const { data, refresh } = await $trpc.admin.photos.paginatePhotosFromVercelStorage.useQuery()
const blobs = computed(() => data.value?.blobs ?? [])


const file = ref()
function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    file.value = files[0]
  }
}

async function uploadImage() {
  try {
    const { blob } = await $trpc.admin.photos.uploadImageToVercelStorage.query({
      image: file.value.name,
    })

    console.log(blob)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div>
    Images
    <input @change="onFileChange" type="file">

    <Button @click="uploadImage">
      Upload
    </Button>
    <div v-if="file" class="border-t border-t-neutral-800">
      {{ file.name }}
    </div>
    <div v-for="blob in blobs">
      {{ blob.url }}
    </div>
  </div>
</template>
