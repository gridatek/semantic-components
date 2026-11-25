import { Extension } from '@tiptap/core';
import FindAndReplace from '@tiptap/extension-find-and-replace';
import type { ScEditorFeature } from '@semantic-components/ui/editor';
import { editorSearch } from './editor-search-state';

/**
 * Search and replace: the search bar's parts, and Ctrl / ⌘ + F in the
 * document to open it.
 */
export function withSearch(): ScEditorFeature {
  return {
    name: 'withSearch',
    behaviour: (editor) => [
      FindAndReplace.configure({ injectCSS: false }),
      Extension.create({
        name: 'scEditorSearchShortcut',
        addKeyboardShortcuts: () => ({
          'Mod-f': () => editorSearch(editor).shortcut(),
        }),
      }),
    ],
  };
}
