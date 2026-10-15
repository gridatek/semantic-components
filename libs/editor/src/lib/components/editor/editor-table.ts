import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR, type ScEditorTableAction } from './editor';

/**
 * The table button: make it the trigger of your menu, whose items call
 * `select(action)` — `insertTable` (3 × 3, with a header row), then, in a
 * table, `addRowBefore`, `addRowAfter`, `deleteRow`, `addColumnBefore`,
 * `addColumnAfter`, `deleteColumn`, `mergeCells`, `splitCell`,
 * `toggleHeaderRow`, `toggleHeaderColumn`, `deleteTable`. `can(action)` says
 * which apply now (disable the others); `inTable()` whether the selection is
 * in a table (`data-state="on"`). Write its icon, name it, write the labels.
 */
@Directive({
  selector: 'button[scEditorTable]',
  exportAs: 'scEditorTable',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[attr.data-state]': 'inTable() ? "on" : "off"',
  },
})
export class ScEditorTable {
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  /** Whether the selection is in a table. */
  readonly inTable = computed(() => this.editor.inTable());

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

  /** Whether this action can run now. */
  can(action: ScEditorTableAction): boolean {
    return this.editor.canTable(action);
  }

  select(action: ScEditorTableAction): void {
    this.editor.runTable(action);
  }
}
