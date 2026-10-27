import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

export type ScEditorListType = 'bulletList' | 'orderedList' | 'taskList';

const LIST_TYPES: ScEditorListType[] = [
  'bulletList',
  'orderedList',
  'taskList',
];

/**
 * The list button: make it the trigger of your menu, whose items call
 * `select(type)` ('bulletList', 'orderedList', 'taskList'); `type()` is the
 * list at the selection, or null (`data-state="on"` inside one). Write its
 * icon, name it, and write the labels — the library has none.
 */
@Directive({
  selector: 'button[scEditorList]',
  exportAs: 'scEditorList',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.data-state]': 'type() ? "on" : "off"',
  },
})
export class ScEditorList {
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  /** The list at the selection (the innermost), or null. */
  readonly type = computed<ScEditorListType | null>(() => {
    this.editor.contentVersion();
    const editor = this.editor.editorInstance();
    if (!editor) return null;
    const { $from } = editor.state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
      const name = $from.node(depth).type.name as ScEditorListType;
      if (LIST_TYPES.includes(name)) return name;
    }
    return null;
  });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  /** Makes the selection a list of this type, or back into paragraphs. */
  select(type: ScEditorListType): void {
    this.editor.run((chain) => {
      switch (type) {
        case 'bulletList':
          return chain.toggleBulletList();
        case 'orderedList':
          return chain.toggleOrderedList();
        case 'taskList':
          return chain.toggleTaskList();
      }
    });
  }
}
