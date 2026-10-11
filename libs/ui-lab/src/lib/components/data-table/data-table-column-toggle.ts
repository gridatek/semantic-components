import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  type ScDataTableColumnsTable,
  type ScDataTableHideableColumn,
  dataTableColumnLabel,
} from './data-table-types';

export const SC_DATA_TABLE_COLUMN_TOGGLE =
  new InjectionToken<ScDataTableColumnToggle>('SC_DATA_TABLE_COLUMN_TOGGLE');

/**
 * "Columns" disclosure: a trigger button and a panel of checkboxes, one per
 * hideable column. Escape or a click outside closes it.
 *
 * ```html
 * <div scDataTableColumnToggle #columns="scDataTableColumnToggle" [table]="table">
 *   <button scButton variant="outline" scDataTableColumnToggleTrigger>
 *     <svg siColumns3Icon></svg> Columns
 *   </button>
 *   <div scDataTableColumnToggleContent>
 *     @for (column of columns.columns(); track column.id) {
 *       <label scCheckboxField>
 *         <input type="checkbox" scCheckbox scDataTableColumnVisibility [column]="column" />
 *         {{ columns.label(column) }}
 *       </label>
 *     }
 *   </div>
 * </div>
 * ```
 */
@Directive({
  selector: '[scDataTableColumnToggle]',
  exportAs: 'scDataTableColumnToggle',
  providers: [
    {
      provide: SC_DATA_TABLE_COLUMN_TOGGLE,
      useExisting: ScDataTableColumnToggle,
    },
  ],
  host: {
    'data-slot': 'data-table-column-toggle',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'close(true)',
    '[class]': 'class()',
  },
})
export class ScDataTableColumnToggle {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly table = input.required<ScDataTableColumnsTable>();
  readonly open = model(false);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly panelId = inject(_IdGenerator).getId('sc-data-table-columns-');
  /** Registered by the trigger, for focus return. */
  readonly trigger = signal<HTMLElement | undefined>(undefined);

  /** Columns the user may hide (TanStack `getCanHide()`). */
  readonly columns = computed(() =>
    this.table()
      .getAllLeafColumns()
      .filter((column) => column.getCanHide()),
  );

  protected readonly class = computed(() =>
    cn('relative inline-block', this.classInput()),
  );

  label(column: ScDataTableHideableColumn): string {
    return dataTableColumnLabel(column);
  }

  toggle(): void {
    this.open.update((open) => !open);
  }

  /** Closes the panel; `restoreFocus` moves focus back to the trigger. */
  close(restoreFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    if (restoreFocus) this.trigger()?.focus();
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
