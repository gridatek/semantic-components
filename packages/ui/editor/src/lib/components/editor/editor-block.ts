import type { ChainedCommands } from '@tiptap/core';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { SC_EDITOR } from './editor';
import { ɵeditorControl } from './editor-control';

/** What the selection's block is: a text style, a list, a quote, code. */
export type ScEditorBlockType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'bullet-list'
  | 'ordered-list'
  | 'task-list'
  | 'quote'
  | 'code-block';

const BLOCK_TYPES: readonly ScEditorBlockType[] = [
  'paragraph',
  'heading-1',
  'heading-2',
  'heading-3',
  'heading-4',
  'heading-5',
  'heading-6',
  'bullet-list',
  'ordered-list',
  'task-list',
  'quote',
  'code-block',
];

/** Tiptap's node of each list, and how to turn it on and off. */
const LISTS = {
  'bullet-list': ['bulletList', (chain) => chain.toggleBulletList()],
  'ordered-list': ['orderedList', (chain) => chain.toggleOrderedList()],
  'task-list': ['taskList', (chain) => chain.toggleTaskList()],
} as const satisfies Record<
  string,
  readonly [string, (chain: ChainedCommands) => ChainedCommands]
>;

type ScEditorListBlock = keyof typeof LISTS;

const isList = (block: ScEditorBlockType): block is ScEditorListBlock =>
  block in LISTS;

/**
 * The selection's block — paragraph, heading, list, quote, code — for a
 * control of yours: `value()` is the block at the selection, `select(block)`
 * makes it another (out of a list or a quote first). Behaviour only: put it
 * on your menu's or select's trigger (in a toolbar, beside `scToolbarWidget`)
 * and write the labels and icons, e.g. a menu whose items call
 * `block.select($event)`, its label from `@switch (block.value())`.
 */
@Directive({
  selector: '[scEditorBlock]',
  exportAs: 'scEditorBlock',
  host: {
    '[class]': 'class()',
  },
})
export class ScEditorBlock {
  private readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  private readonly class = computed(() => cn(this.classInput()));

  private readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  /** The block at the selection: a list or a quote around it first. */
  readonly value = computed<ScEditorBlockType>(() => {
    for (const [block, [node]] of Object.entries(LISTS))
      if (this.editor.isActive(node)) return block as ScEditorBlockType;
    if (this.editor.isActive('blockquote')) return 'quote';
    if (this.editor.isActive('codeBlock')) return 'code-block';
    for (let level = 1; level <= 6; level++)
      if (this.editor.isActive('heading', { level }))
        return `heading-${level}` as ScEditorBlockType;
    return 'paragraph';
  });

  constructor() {
    ɵeditorControl({ disabled: this.disabled });
  }

  /**
   * Makes the selection's block this one: a text style, a list, a quote or
   * code — out of the list or quote it's in first. A value that isn't a
   * block (a menu's other item) is ignored.
   */
  select(block: unknown): void {
    if (!BLOCK_TYPES.includes(block as ScEditorBlockType)) return;
    const next = block as ScEditorBlockType;
    const current = this.value();
    if (next === current) return;
    this.editor.run((chain) => {
      // Out of the list or quote around the text first.
      let steps = chain;
      if (isList(current)) steps = LISTS[current][1](steps);
      else if (current === 'quote') steps = steps.toggleBlockquote();
      if (isList(next)) return LISTS[next][1](steps.setParagraph());
      if (next === 'quote') return steps.setParagraph().toggleBlockquote();
      if (next === 'code-block') return steps.setCodeBlock();
      if (next === 'paragraph') return steps.setParagraph();
      const level = Number(next.slice('heading-'.length)) as
        1 | 2 | 3 | 4 | 5 | 6;
      return steps.setHeading({ level });
    });
  }
}
