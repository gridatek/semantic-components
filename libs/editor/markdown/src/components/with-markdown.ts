import { MarkdownManager } from '@tiptap/markdown';
import type { ScEditorFeature } from '@semantic-components/editor';

/**
 * Markdown: `format="markdown"` on the editor and `scEditorView`, with the
 * document's features (a table in a table's syntax).
 */
export function withMarkdown(): ScEditorFeature {
  return {
    name: 'withMarkdown',
    markdown: (extensions) => {
      const manager = new MarkdownManager({ extensions });
      return {
        parse: (source) => manager.parse(source),
        serialize: (doc) => manager.serialize(doc),
      };
    },
  };
}
