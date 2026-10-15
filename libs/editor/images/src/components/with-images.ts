import FileHandler from '@tiptap/extension-file-handler';
import Image from '@tiptap/extension-image';
import type { ScEditorFeature } from '@semantic-components/editor';

/**
 * Images: the document holds them, `scEditorImage` picks them, and dropping
 * or pasting one uploads it too — with the editor's `upload` handler.
 */
export function withImages(): ScEditorFeature {
  return {
    name: 'withImages',
    content: [Image],
    behaviour: (editor) => [
      FileHandler.configure({
        onDrop: (_editor, files, position) =>
          editor.insertImages(files, position),
        onPaste: (_editor, files) => editor.insertImages(files),
      }),
    ],
  };
}
