import type { ChainedCommands } from '@tiptap/core';
import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, assertEditorFeature } from '@semantic-components/editor';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';

/** What `select` / `can` do to a table. */
export type ScEditorTableAction =
  | 'insertTable'
  | 'addRowBefore'
  | 'addRowAfter'
  | 'deleteRow'
  | 'addColumnBefore'
  | 'addColumnAfter'
  | 'deleteColumn'
  | 'mergeCells'
  | 'splitCell'
  | 'toggleHeaderRow'
  | 'toggleHeaderColumn'
  | 'deleteTable';

/**
 * The table button: make it the trigger of your menu, whose items call
 * `select(action)` — `insertTable` (3 × 3, with a header row), then, in a
 * table, `addRowBefore`, `addRowAfter`, `deleteRow`, `addColumnBefore`,
 * `addColumnAfter`, `deleteColumn`, `mergeCells`, `splitCell`,
 * `toggleHeaderRow`, `toggleHeaderColumn`, `deleteTable`. `can(action)` says
 * which apply now (disable the others); `inTable()` whether the selection is
 * in a table (`data-state="on"`). Write its icon, name it, write the labels.
 * Needs `withTables()`.
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
  readonly inTable = computed(() => this.editor.isActive('table'));

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
    assertEditorFeature('withTables', 'scEditorTable');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  /** Whether this action can run now. */
  can(action: ScEditorTableAction): boolean {
    return this.editor.can((chain) => tableCommand(chain, action));
  }

  select(action: ScEditorTableAction): void {
    this.editor.run((chain) => tableCommand(chain, action));
  }
}

/** A table action as a command. */
function tableCommand(
  chain: ChainedCommands,
  action: ScEditorTableAction,
): ChainedCommands {
  if (action === 'insertTable') {
    return chain.insertTable({ rows: 3, cols: 3, withHeaderRow: true });
  }
  return chain[action]();
}
