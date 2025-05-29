<template>
  <div>
    <div>
      <button @click="toggleBold" :class="{ active: isActive('bold') }">
        <b>B</b>
      </button>
      <button @click="toggleItalic" :class="{ active: isActive('italic') }">
        <i>I</i>
      </button>
      <button @click="toggleStrike" :class="{ active: isActive('strike') }">
        <s>S</s>
      </button>
      <button
        @click="toggleHeading(1)"
        :class="{ active: isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="toggleHeading(2)"
        :class="{ active: isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="toggleBulletList"
        :class="{ active: isActive('bulletList') }"
      >
        • List
      </button>
      <button
        @click="toggleOrderedList"
        :class="{ active: isActive('orderedList') }"
      >
        1. List
      </button>
      <button
        @click="toggleBlockquote"
        :class="{ active: isActive('blockquote') }"
      >
        ❝
      </button>
      <button
        @click="toggleCodeBlock"
        :class="{ active: isActive('codeBlock') }"
      >
        &lt;/&gt;
      </button>
      <button @click="undo" :disabled="!canUndo">⟲</button>
      <button @click="redo" :disabled="!canRedo">⟳</button>
      <button @click="addLink">🔗</button>
      <button @click="addImage">🖼️</button>
    </div>
    <div class="w-full h-full">
      <editor-content class="tiptap h-64" :editor="editor" />
    </div>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      editor: null,
    };
  },

  computed: {
    canUndo() {
      return this.editor && this.editor.can().undo();
    },
    canRedo() {
      return this.editor && this.editor.can().redo();
    },
  },

  watch: {
    modelValue(value) {
      if (!this.editor) return;
      const isSame = this.editor.getHTML() === value;
      if (isSame) return;
      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        // History,
        Link.configure({ openOnClick: false }),
        Image,
        Underline,
        Placeholder.configure({
          placeholder: "Start typing…",
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
        },
      },
      content: this.modelValue,
      onUpdate: () => {
        this.$emit("update:modelValue", this.editor.getHTML());
      },
    });
  },

  beforeUnmount() {
    if (this.editor) this.editor.destroy();
  },

  methods: {
    isActive(format, options = {}) {
      return this.editor && this.editor.isActive(format, options);
    },
    toggleBold() {
      this.editor.chain().focus().toggleBold().run();
    },
    toggleItalic() {
      this.editor.chain().focus().toggleItalic().run();
    },
    toggleStrike() {
      this.editor.chain().focus().toggleStrike().run();
    },
    toggleHeading(level) {
      this.editor.chain().focus().toggleHeading({ level }).run();
    },
    toggleBulletList() {
      this.editor.chain().focus().toggleBulletList().run();
    },
    toggleOrderedList() {
      this.editor.chain().focus().toggleOrderedList().run();
    },
    toggleBlockquote() {
      this.editor.chain().focus().toggleBlockquote().run();
    },
    toggleCodeBlock() {
      this.editor.chain().focus().toggleCodeBlock().run();
    },
    undo() {
      this.editor.chain().focus().undo().run();
    },
    redo() {
      this.editor.chain().focus().redo().run();
    },
    addLink() {
      const url = prompt("Enter URL");
      if (url) {
        this.editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      }
    },
    addImage() {
      const url = prompt("Enter image URL");
      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },
};
</script>

<style scoped>
.editor-wrapper {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px #0001;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.toolbar button {
  background: none;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.toolbar button.active,
.toolbar button:hover {
  background: #e3e3e3;
}

.toolbar button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tiptap {
  min-height: 350px;
  padding: 1.5rem;
  outline: none;
  font-size: 1.1rem;
  line-height: 1.7;
  font-family: "Segoe UI", Arial, sans-serif;
}

/* Basic editor styles */
.tiptap :first-child {
  margin-top: 0;
}

/* List styles */
.tiptap ul,
.tiptap ol {
  padding: 0 1rem;
  margin: 1.25rem 1rem 1.25rem 0.4rem;
}

.tiptap ul li p,
.tiptap ol li p {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

/* Heading styles */
.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.1;
  margin-top: 2.5rem;
  text-wrap: pretty;
}

.tiptap h1,
.tiptap h2 {
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

.tiptap h1 {
  font-size: 1.4rem;
}

.tiptap h2 {
  font-size: 1.2rem;
}

.tiptap h3 {
  font-size: 1.1rem;
}

.tiptap h4,
.tiptap h5,
.tiptap h6 {
  font-size: 1rem;
}

/* Code and preformatted text styles */
.tiptap code {
  background-color: var(--purple-light);
  border-radius: 0.4rem;
  color: var(--black);
  font-size: 0.85rem;
  padding: 0.25em 0.3em;
}

.tiptap pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: "JetBrainsMono", monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

.tiptap blockquote {
  border-left: 3px solid var(--gray-3);
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.tiptap hr {
  border: none;
  border-top: 1px solid var(--gray-2);
  margin: 2rem 0;
}
</style>
