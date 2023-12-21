
<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Bold, AlignLeft, AlignRight, AlignCenter, Italic, Dot, MessageSquareQuote, ListOrdered, Underline as UnderlineIcon, Code2, Code, Heading1, Heading2, Heading3 } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  }
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
    }
  },
})
</script>

<template>
  <div>
    <div v-if="editor" class="flex gap-1 p-2 my-2 border rounded">
      <button @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active text-white': editor.isActive('bold') }">
        <Bold :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active text-white': editor.isActive('italic') }">
        <Italic :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active text-white': editor.isActive('underline') }">
        <UnderlineIcon :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active text-white': editor.isActive('code') }">
        <Code :size="25" />
      </button>
      <button @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active text-white': editor.isActive('paragraph') }">
        <div class="text-xl">P</div>
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active text-white': editor.isActive('heading', { level: 1 }) }">
        <Heading1 :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active text-white': editor.isActive('heading', { level: 2 }) }">
        <Heading2 :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active text-white': editor.isActive('heading', { level: 3 }) }">
        <Heading3 :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active text-white': editor.isActive('bulletList') }">
        <Dot :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active text-white': editor.isActive('orderedList') }">
        <ListOrdered :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active text-white': editor.isActive('codeBlock') }">
        <Code2 :size="25" />
      </button>
      <button @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active text-white': editor.isActive('blockquote') }">
        <MessageSquareQuote :size="25" />
      </button>
      <div class="mx-2 border-r"/>
      <button @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        <AlignLeft :size="25" />
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        <AlignCenter :size="25" />
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        <AlignRight :size="25" />
      </button>
    </div>

    <EditorContent :editor="editor" />

    <slot name="actions">
      <div class="flex justify-end mt-2">
        <Button type="button" class="flex justify-end cursor-pointer hover:opacity-75" @click="() => emit('submit')">
          Crea
        </Button>
      </div>
    </slot>

  </div>
</template>
