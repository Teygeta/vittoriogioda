<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { AlignCenter, AlignLeft, AlignRight, Bold, Code, Code2, Dot, Heading3, Italic, ListOrdered, Loader2, MessageSquareQuote, Underline as UnderlineIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  submitting: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<Emits>()
interface Emits {
  (eventName: 'submit'): void
  (eventName: 'update:modelValue', modelValue: string): void
}

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    const html = editor.getHTML().replaceAll('<p></p>', '<p><br></p>')
    emit('update:modelValue', html)
  },
  extensions: [
    StarterKit,
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert mx-auto focus:outline-none border p-2 min-h-[400px] w-full !max-w-none',
    },
    transformPastedText(text) {
      return text.toUpperCase()
    },
  },
})
</script>

<template>
  <div>
    <div v-if="editor" class="flex gap-1 p-2 my-2 border rounded">
      <button
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active text-white': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()"
      >
        <Bold :size="25" />
      </button>
      <button
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active text-white': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <Italic :size="25" />
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('underline') }"
        @click="editor.chain().focus().toggleUnderline().run()"
      >
        <UnderlineIcon :size="25" />
      </button>
      <button
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active text-white': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()"
      >
        <Code :size="25" />
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('paragraph') }"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <div class="text-xl">
          P
        </div>
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('heading', { level: 3 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <Heading3 :size="25" />
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <Dot :size="25" />
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <ListOrdered :size="25" />
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('codeBlock') }"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <Code2 :size="25" />
      </button>
      <button
        :class="{ 'is-active text-white': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <MessageSquareQuote :size="25" />
      </button>
      <div class="mx-2 border-r" />
      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        @click="editor.chain().focus().setTextAlign('left').run()"
      >
        <AlignLeft :size="25" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        @click="editor.chain().focus().setTextAlign('center').run()"
      >
        <AlignCenter :size="25" />
      </button>
      <button
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        @click="editor.chain().focus().setTextAlign('right').run()"
      >
        <AlignRight :size="25" />
      </button>
    </div>

    <EditorContent :editor="editor" />

    <slot name="actions">
      <div class="flex justify-end mt-2">
        <Button type="button" class="flex justify-end cursor-pointer hover:opacity-75" @click="() => emit('submit')">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" :class="[submitting ? '' : 'hidden']" />
          Crea
        </Button>
      </div>
    </slot>
  </div>
</template>
