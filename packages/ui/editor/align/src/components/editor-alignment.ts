import type { ScEditor } from '@semantic-components/ui/editor';

export type ScEditorAlignment = 'left' | 'center' | 'right' | 'justify';

/** The alignment at the selection (`left` when none is set). */
export function editorAlignment(editor: ScEditor): ScEditorAlignment {
  for (const align of ['center', 'right', 'justify'] as const) {
    if (editor.isActive({ textAlign: align })) return align;
  }
  return 'left';
}
