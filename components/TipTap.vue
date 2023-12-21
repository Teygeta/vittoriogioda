
<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Bold, Italic, Dot, MessageSquareQuote, ListOrdered, Underline as UnderlineIcon, Code2, Code, Heading1, Heading2, Heading3 } from 'lucide-vue-next'


const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border p-2 min-h-[200px]',
    },
    transformPastedText(text) {
      return text.toUpperCase()
    }
  },
})


</script>

<template>
  <div>
    <div v-if="editor" class="flex gap-1">
      <button @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
        left
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
        center
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
        right
      </button>
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
    </div>
    <div>
      <editor-content :editor="editor" />
    </div>
  </div>
</template>
