import type { JSONContent } from '@tiptap/core';
import { MarkdownManager } from '@tiptap/markdown';
import { editorContentExtensions } from './editor-extensions';

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

let markdown: MarkdownManager | null = null;

/** Reads and writes Markdown with the document's extensions (made once). */
function markdownManager(): MarkdownManager {
  markdown ??= new MarkdownManager({ extensions: editorContentExtensions() });
  return markdown;
}

/** Markdown as a document. */
export function markdownToDocument(source: string): JSONContent {
  return markdownManager().parse(source);
}

/** A document as Markdown. */
export function documentToMarkdown(doc: JSONContent): string {
  return markdownManager().serialize(doc);
}
