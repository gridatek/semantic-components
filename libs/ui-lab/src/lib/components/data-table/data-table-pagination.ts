import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';
import { SC_DATA_TABLE } from './data-table';

@Component({
  selector: '[scDataTablePagination]',
  imports: [
    SiChevronsLeftIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiChevronsRightIcon,
  ],
  template: `
    <div class="flex items-center justify-between px-2">
      <div class="text-muted-foreground text-sm">
        @if (showSelection()) {
          {{ table.rowSelection().size }} of
          {{ table.sortedData().length }} row(s) selected.
        } @else {
          {{ table.sortedData().length }} row(s) total.
        }
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8 rtl:space-x-reverse">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <label class="text-sm font-medium" [for]="pageSizeId">
            Rows per page
          </label>
          <select
            [id]="pageSizeId"
            class="border-input bg-background h-8 w-[70px] rounded-md border text-sm"
            (change)="onPageSizeChange($event)"
          >
            @for (size of pageSizes(); track size) {
              <option [value]="size" [selected]="size === table.pageSize()">
                {{ size }}
              </option>
            }
          </select>
        </div>
        <div
          class="flex w-[100px] items-center justify-center text-sm font-medium"
          aria-live="polite"
        >
          Page {{ table.currentPage() }} of {{ table.pageCount() }}
        </div>
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="table.currentPage() === 1"
            (click)="table.goToPage(1)"
            aria-label="First page"
          >
            <svg siChevronsLeftIcon class="size-4 rtl:rotate-180"></svg>
          </button>
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="table.currentPage() === 1"
            (click)="table.goToPage(table.currentPage() - 1)"
            aria-label="Previous page"
          >
            <svg siChevronLeftIcon class="size-4 rtl:rotate-180"></svg>
          </button>
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="table.currentPage() === table.pageCount()"
            (click)="table.goToPage(table.currentPage() + 1)"
            aria-label="Next page"
          >
            <svg siChevronRightIcon class="size-4 rtl:rotate-180"></svg>
          </button>
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="table.currentPage() === table.pageCount()"
            (click)="table.goToPage(table.pageCount())"
            aria-label="Last page"
          >
            <svg siChevronsRightIcon class="size-4 rtl:rotate-180"></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDataTablePagination {
  readonly table = inject(SC_DATA_TABLE);
  protected readonly pageSizeId = inject(_IdGenerator).getId(
    'sc-data-table-page-size-',
  );

  readonly classInput = input<string>('', { alias: 'class' });
  readonly pageSizes = input<number[]>([10, 20, 30, 40, 50]);
  readonly showSelection = input<boolean>(true);

  protected readonly class = computed(() => cn('py-4', this.classInput()));

  onPageSizeChange(event: Event): void {
    this.table.setPageSize(
      parseInt((event.target as HTMLSelectElement).value, 10),
    );
  }
}
