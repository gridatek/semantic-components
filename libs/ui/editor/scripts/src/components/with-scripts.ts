import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import type { ScEditorFeature } from '@semantic-components/ui/editor';

declare module '@semantic-components/ui/editor' {
  interface ScEditorCommands {
    superscript: true;
    subscript: true;
  }
}

/**
 * Superscript and subscript: the commands `superscript`, `subscript`
 * (`scEditorCommand`) — each turns the other off.
 */
export function withScripts(): ScEditorFeature {
  return {
    name: 'withScripts',
    content: [Superscript, Subscript],
    commands: {
      superscript: {
        run: (chain) => chain.unsetSubscript().toggleSuperscript(),
        active: (editor) => editor.isActive('superscript'),
      },
      subscript: {
        run: (chain) => chain.unsetSuperscript().toggleSubscript(),
        active: (editor) => editor.isActive('subscript'),
      },
    },
  };
}
