import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_DATA_TABLE } from './data-table';

@Component({
  selector: '[sc-data-table-pagination]',
  template: `
    <div class="flex items-center justify-between px-2">
      <div class="text-sm text-muted-foreground">
        @if (showSelection()) {
          {{ table.rowSelection().size }} of
          {{ table.sortedData().length }} row(s) selected.
        } @else {
          {{ table.sortedData().length }} row(s) total.
        }
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Rows per page</p>
          <select
            class="h-8 w-[70px] rounded-md border border-input bg-background text-sm"
            [value]="pageSize()"
            (change)="onPageSizeChange($event)"
          >
            @for (size of pageSizes(); track size) {
              <option [value]="size">{{ size }}</option>
            }
          </select>
        </div>
        <div
          class="flex w-[100px] items-center justify-center text-sm font-medium"
        >
          Page {{ currentPage() }} of {{ totalPages() }}
        </div>
        <div class="flex items-center space-x-2">
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50"
            [disabled]="currentPage() === 1"
            (click)="goToPage(1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="m11 17-5-5 5-5" />
              <path d="m18 17-5-5 5-5" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50"
            [disabled]="currentPage() === 1"
            (click)="goToPage(currentPage() - 1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50"
            [disabled]="currentPage() === totalPages()"
            (click)="goToPage(currentPage() + 1)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent disabled:opacity-50"
            [disabled]="currentPage() === totalPages()"
            (click)="goToPage(totalPages())"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="size-4"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  host: {
    'data-slot': 'data-table-pagination',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDataTablePagination {
  readonly table = inject(SC_DATA_TABLE);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly pageSize = model<number>(10);
  readonly currentPage = model<number>(1);
  readonly pageSizes = input<number[]>([10, 20, 30, 40, 50]);
  readonly showSelection = input<boolean>(true);

  protected readonly class = computed(() => cn('py-4', this.classInput()));

  readonly totalPages = computed(() => {
    const total = this.table.sortedData().length;
    const size = this.pageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  onPageSizeChange(event: Event): void {
    const value = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pageSize.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    const total = this.totalPages();
    this.currentPage.set(Math.max(1, Math.min(page, total)));
  }
}
