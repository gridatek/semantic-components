import type { JSONContent } from '@tiptap/core';
import { editorContentExtensions } from './editor-extensions';
import type { ScEditorFeature, ScEditorMarkdown } from './editor-features';

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

const markdowns = new WeakMap<readonly ScEditorFeature[], ScEditorMarkdown>();

/** Reads and writes Markdown with these features' document (made once). */
export function editorMarkdown(
  features: readonly ScEditorFeature[],
): ScEditorMarkdown {
  let markdown = markdowns.get(features);
  if (!markdown) {
    const make = features.find((feature) => feature.markdown)?.markdown;
    if (!make) {
      throw new Error(
        'The markdown format needs withMarkdown() in provideEditor(…).',
      );
    }
    markdown = make(editorContentExtensions(features));
    markdowns.set(features, markdown);
  }
  return markdown;
}
