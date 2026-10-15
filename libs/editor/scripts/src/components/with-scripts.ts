import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import type { ScEditorFeature } from '@semantic-components/editor';

/** Superscript and subscript: `scEditorSuperscript`, `scEditorSubscript`. */
export function withScripts(): ScEditorFeature {
  return { name: 'withScripts', content: [Superscript, Subscript] };
}
