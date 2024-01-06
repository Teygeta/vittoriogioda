<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const file = ref()

function fileUploaded(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    file.value = files[0]
  }
}
</script>

<template>
  <div>
    Images
    <input @change="fileUploaded" type="file">
    {{ file }}
  </div>
</template>
