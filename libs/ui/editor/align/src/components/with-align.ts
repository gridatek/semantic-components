import TextAlign from '@tiptap/extension-text-align';
import type { ScEditorFeature } from '@semantic-components/ui/editor';

/** Paragraphs and headings aligned left, centred, right or justified. */
export function withAlign(): ScEditorFeature {
  return {
    name: 'withAlign',
    content: [TextAlign.configure({ types: ['heading', 'paragraph'] })],
  };
}
