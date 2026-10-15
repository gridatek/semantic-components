import type { JSONContent } from '@tiptap/core';

/**
 * Plain text as a document: a paragraph per line (an empty line, an empty
 * paragraph), so the editor's text value comes back as it went in.
 */
export function textToDocument(text: string): JSONContent {
  return {
    type: 'doc',
    content: text.split('\n').map((line) => ({
      type: 'paragraph',
      ...(line ? { content: [{ type: 'text', text: line }] } : {}),
    })),
  };
}
