import type { Extensions } from '@tiptap/core';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';

/**
 * The extensions that make the editor's document: what it can hold and how
 * it is written as HTML. `scEditor` adds its behaviour to them (placeholder,
 * search, drops); `scEditorView` displays HTML with them. Use them to read or
 * write the editor's HTML elsewhere (Tiptap's `generateHTML`, `generateJSON`).
 */
export function editorContentExtensions(): Extensions {
  return [
    StarterKit.configure({
      link: {
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
      // The checkbox is named by its task.
      a11y: { checkboxLabel: (node) => node.textContent },
    }),
    Highlight.configure({ multicolor: true }),
    Superscript,
    Subscript,
    Image,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    // Tables, their columns resized by dragging their borders.
    TableKit.configure({ table: { resizable: true } }),
  ];
}
