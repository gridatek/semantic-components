import TextAlign from '@tiptap/extension-text-align';
import type {
  ScEditorCommandDefinition,
  ScEditorFeature,
} from '@semantic-components/ui/editor';
import { type ScEditorAlignment, editorAlignment } from './editor-alignment';

declare module '@semantic-components/ui/editor' {
  interface ScEditorCommands {
    'align-left': true;
    'align-center': true;
    'align-right': true;
    'align-justify': true;
  }
}

/** Sets the paragraph's alignment; pressed while it has it. */
const align = (alignment: ScEditorAlignment): ScEditorCommandDefinition => ({
  run: (chain) => chain.setTextAlign(alignment),
  active: (editor) => editorAlignment(editor) === alignment,
});

/**
 * Paragraphs and headings aligned left, centred, right or justified: the
 * commands `align-left`, `align-center`, `align-right`, `align-justify`
 * (`scEditorCommand`).
 */
export function withAlign(): ScEditorFeature {
  return {
    name: 'withAlign',
    content: [TextAlign.configure({ types: ['heading', 'paragraph'] })],
    commands: {
      'align-left': align('left'),
      'align-center': align('center'),
      'align-right': align('right'),
      'align-justify': align('justify'),
    },
  };
}
