import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScInput,
} from '@semantic-components/ui';
import type { Table } from '@tanstack/angular-table';

@Component({
  selector: 'app-data-table-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ScButton, ScCheckbox, ScCheckboxField, ScInput],
  host: { class: 'mb-4 flex flex-wrap items-center gap-4' },
  template: `
    <!-- Global Filter -->
    <input
      scInput
      type="text"
      [value]="globalFilter()"
      (input)="globalFilterChange.emit($any($event.target).value)"
      placeholder="Search all columns..."
    />

    <!-- Column Visibility -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium">Columns:</span>
      @for (column of table().getAllLeafColumns(); track column.id) {
        @if (column.id !== 'select' && column.id !== 'expand') {
          <label scCheckboxField class="text-sm">
            <input
              type="checkbox"
              scCheckbox
              [checked]="column.getIsVisible()"
              (change)="column.toggleVisibility()"
            />
            {{ column.id }}
          </label>
        }
      }
    </div>

    <!-- Grouping -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium">Group by:</span>
      @for (group of groupableColumns; track group) {
        <button
          scButton
          [variant]="isGroupedBy(group) ? 'default' : 'outline'"
          size="sm"
          (click)="toggleGroup(group)"
        >
          {{ group }}
        </button>
      }
    </div>

    <!-- Selection Count -->
    @if (selectedRowCount() > 0) {
      <span class="text-muted-foreground text-sm">
        {{ selectedRowCount() }} of
        {{ table().getRowModel().rows.length }} row(s) selected
      </span>
    }
  `,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DataTableToolbar {
  readonly table = input.required<Table<any>>();
  readonly globalFilter = input<string>('');
  readonly globalFilterChange = output<string>();
  readonly grouping = input<string[]>([]);
  readonly groupingChange = output<string[]>();

  readonly groupableColumns = ['role', 'plan'];

  readonly selectedRowCount = computed(
    () => Object.keys(this.table().getState().rowSelection).length,
  );

  isGroupedBy(columnId: string): boolean {
    return this.grouping().includes(columnId);
  }

  toggleGroup(columnId: string): void {
    const current = this.grouping();
    const next = current.includes(columnId)
      ? current.filter((id) => id !== columnId)
      : [...current, columnId];
    this.groupingChange.emit(next);
  }
}
