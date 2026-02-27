import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import type { Table } from '@tanstack/angular-table';

@Component({
  selector: 'app-data-table-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ScButton],
  host: { class: 'flex items-center justify-between px-2 py-4' },
  template: `
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Rows per page:</span>
      <select
        [value]="table().getState().pagination.pageSize"
        (change)="table().setPageSize(+$any($event.target).value)"
        class="h-8 rounded-md border border-input bg-transparent px-2 text-sm"
      >
        @for (size of pageSizeOptions(); track size) {
          <option [value]="size">{{ size }}</option>
        }
      </select>
    </div>

    <div class="flex items-center gap-2 text-sm">
      <span class="text-muted-foreground">
        Page {{ table().getState().pagination.pageIndex + 1 }} of
        {{ table().getPageCount() }}
      </span>
      <button
        scButton
        variant="outline"
        size="icon-sm"
        (click)="table().firstPage()"
        [disabled]="!table().getCanPreviousPage()"
      >
        &laquo;
      </button>
      <button
        scButton
        variant="outline"
        size="icon-sm"
        (click)="table().previousPage()"
        [disabled]="!table().getCanPreviousPage()"
      >
        &lsaquo;
      </button>
      <button
        scButton
        variant="outline"
        size="icon-sm"
        (click)="table().nextPage()"
        [disabled]="!table().getCanNextPage()"
      >
        &rsaquo;
      </button>
      <button
        scButton
        variant="outline"
        size="icon-sm"
        (click)="table().lastPage()"
        [disabled]="!table().getCanNextPage()"
      >
        &raquo;
      </button>
    </div>
  `,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DataTablePagination {
  readonly table = input.required<Table<any>>();
  readonly pageSizeOptions = input<number[]>([5, 10, 20, 30]);
}
