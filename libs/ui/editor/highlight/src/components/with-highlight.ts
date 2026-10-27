import Highlight from '@tiptap/extension-highlight';
import type { ScEditorFeature } from '@semantic-components/ui/editor';

/** Highlights, in colours: `scEditorHighlight` and its swatches. */
export function withHighlight(): ScEditorFeature {
  return {
    name: 'withHighlight',
    content: [Highlight.configure({ multicolor: true })],
  };
}
