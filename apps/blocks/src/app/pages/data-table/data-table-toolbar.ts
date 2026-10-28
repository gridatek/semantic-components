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
      i18n-placeholder="@@dataTable.toolbar.searchPlaceholder"
      aria-label="Search all columns"
      i18n-aria-label="@@dataTable.toolbar.search"
    />

    <!-- Column Visibility -->
    <div
      class="flex items-center gap-2"
      role="group"
      aria-label="Columns"
      i18n-aria-label="@@dataTable.toolbar.columnsLabel"
    >
      <span
        class="text-sm font-medium"
        aria-hidden="true"
        i18n="@@dataTable.toolbar.columns"
        >Columns:</span
      >
      @for (column of table().getAllLeafColumns(); track column.id) {
        @if (column.id !== 'select' && column.id !== 'expand') {
          <label scCheckboxField class="text-sm">
            <input
              type="checkbox"
              scCheckbox
              scDataTableColumnVisibility
              [column]="column"
            />
            {{ columnLabel(column.id) }}
          </label>
        }
      }
    </div>

    <!-- Grouping -->
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium" i18n="@@dataTable.toolbar.groupBy"
        >Group by:</span
      >
      @for (group of groupableColumns; track group) {
        <button
          scButton
          [variant]="isGroupedBy(group) ? 'default' : 'outline'"
          size="sm"
          [attr.aria-pressed]="isGroupedBy(group)"
          (click)="toggleGroup(group)"
        >
          {{ columnLabel(group) }}
        </button>
      }
    </div>

    <!-- Selection Count -->
    @if (selectedRowCount() > 0) {
      <span class="text-muted-foreground text-sm" i18n="@@dataTable.selected">
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

  /** A column's header, translated in its definition. */
  columnLabel(columnId: string): string {
    const header = this.table().getColumn(columnId)?.columnDef.header;
    return typeof header === 'string' ? header : columnId;
  }

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
