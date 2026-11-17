import type { ChainedCommands } from '@tiptap/core';
import { Directive, computed, inject, input } from '@angular/core';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
  ɵeditorControl,
} from '@semantic-components/ui/editor';
import { cn } from 'cn';

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
 * in a table. A menu button, not a toggle: no pressed look in a table (as
 * Tiptap's table trigger). Write its icon, name it, write the labels.
 * Needs `withTables()`.
 */
@Directive({
  selector: 'button[scEditorTable]',
  exportAs: 'scEditorTable',
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScEditorTable {
  private readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  /** Whether the selection is in a table. */
  readonly inTable = computed(() => this.editor.isActive('table'));

  private readonly class = computed(() => cn(this.classInput()));

  private readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable(),
  );

  constructor() {
    ɵassertEditorFeature('withTables', 'scEditorTable');
    ɵeditorControl({ disabled: this.disabled });
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
