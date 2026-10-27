import type { Extensions } from '@tiptap/core';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import StarterKit from '@tiptap/starter-kit';
import type { ScEditorFeature } from './editor-features';

/**
 * The extensions that make the editor's document: what it can hold and how
 * it is written as HTML — the core, and what its features add. `scEditor`
 * adds its behaviour to them (placeholder, counts); `scEditorView` displays
 * documents with them. Use them, with the same features, to read or write the
 * editor's HTML elsewhere (Tiptap's `generateHTML`, `generateJSON`).
 */
export function editorContentExtensions(
  features: readonly ScEditorFeature[] = [],
): Extensions {
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
    ...features.flatMap((feature) => feature.content ?? []),
  ];
}
