<script setup lang="ts">
import { ExternalLink, MoreVertical, UploadCloud } from 'lucide-vue-next'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

definePageMeta({
  middleware: ['auth', 'user-role'],
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

    refresh()
  }
  catch (error) {
    //
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <div class="flex justify-between">
        <div>
          <h2 class="text-2xl font-bold tracking-tight">
            Photos
          </h2>
          <p class="text-muted-foreground">
            Manage photos uploaded to
            <a class="underline" target="_blank" href="https://vercel.com/docs/storage/vercel-blob">
              Vercel Blob Storage
            </a>
          </p>
        </div>

        <Dialog>
          <DialogTrigger>
            <Button>
              <UploadCloud :size="20" class="mr-2" />
              Upload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload</DialogTitle>
              <DialogDescription>
                Select a file to upload
              </DialogDescription>
            </DialogHeader>

            <Input type="file" @change="onFileChange" />

            <DialogFooter>
              <Button @click="uploadImage">
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Pathname
              </TableHead>
              <TableHead>
                UploadedAt
              </TableHead>
              <TableHead class="text-right">
                Size
              </TableHead>
              <TableHead class="text-center">
                Edit
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow v-for="blob in blobs" :key="blob.url">
              <TableCell class="font-medium">
                {{ blob.pathname }}
              </TableCell>
              <TableCell>
                {{ blob.uploadedAt }}
              </TableCell>
              <TableCell class="text-right text-neutral-500">
                {{ blob.size }} bite
              </TableCell>
              <TableCell class="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <MoreVertical :size="20" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem as-child class="hover:cursor-pointer">
                      <a class="w-full flex justify-between items-center" target="_blank" :href="blob.url">
                        Preview
                        <ExternalLink :size="14" />
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem class="hover:cursor-pointer" @click="() => deleteBlob(blob)">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  </div>
</template>
