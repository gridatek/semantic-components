import { TableKit } from '@tiptap/extension-table';
import type { ScEditorFeature } from '@semantic-components/ui/editor';

/**
 * Tables, their columns resized by dragging their borders: the document holds
 * them, `scEditorTable` inserts and edits them.
 */
export function withTables(): ScEditorFeature {
  return {
    name: 'withTables',
    content: [TableKit.configure({ table: { resizable: true } })],
  };
}
