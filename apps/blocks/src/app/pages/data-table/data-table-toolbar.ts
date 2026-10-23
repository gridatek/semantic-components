import type { Table } from '@tanstack/angular-table';
import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';
import {
  ScButton,
  ScCheckbox,
  ScCheckboxField,
  ScInput,
} from '@semantic-components/ui';
import {
  ScDataTableColumnVisibility,
  ScDataTableGlobalFilter,
} from '@semantic-components/ui/data-table';
import type { DataTableFeatures } from './data-table-features';
import type { User } from './user.service';

@Component({
  selector: 'app-data-table-toolbar',
  encapsulation: ViewEncapsulation.None,
  imports: [
    ScButton,
    ScCheckbox,
    ScCheckboxField,
    ScInput,
    ScDataTableColumnVisibility,
    ScDataTableGlobalFilter,
  ],
  host: { class: 'mb-4 flex flex-wrap items-center gap-4' },
  template: `
    <!-- Global Filter -->
    <input
      scInput
      scDataTableGlobalFilter
      [table]="table()"
      placeholder="Search all columns..."
      aria-label="Search all columns"
    />

    <!-- Column Visibility -->
    <div class="flex items-center gap-2" role="group" aria-label="Columns">
      <span class="text-sm font-medium" aria-hidden="true">Columns:</span>
      @for (column of table().getAllLeafColumns(); track column.id) {
        @if (column.id !== 'select' && column.id !== 'expand') {
          <label scCheckboxField class="text-sm">
            <input
              type="checkbox"
              scCheckbox
              scDataTableColumnVisibility
              [column]="column"
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
          [attr.aria-pressed]="isGroupedBy(group)"
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
export class DataTableToolbar {
  readonly table = input.required<Table<DataTableFeatures, User>>();
  readonly grouping = input<string[]>([]);
  readonly groupingChange = output<string[]>();

  readonly groupableColumns = ['role', 'plan'];

  readonly selectedRowCount = computed(
    () => Object.keys(this.table().atoms.rowSelection.get()).length,
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
