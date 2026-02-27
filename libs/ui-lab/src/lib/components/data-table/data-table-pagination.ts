import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiChevronsLeftIcon,
  SiChevronsRightIcon,
} from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
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
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Rows per page</p>
          <select
            class="border-input bg-background h-8 w-[70px] rounded-md border text-sm"
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
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="currentPage() === 1"
            (click)="goToPage(1)"
            aria-label="First page"
          >
            <svg siChevronsLeftIcon class="size-4"></svg>
          </button>
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="currentPage() === 1"
            (click)="goToPage(currentPage() - 1)"
            aria-label="Previous page"
          >
            <svg siChevronLeftIcon class="size-4"></svg>
          </button>
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="currentPage() === totalPages()"
            (click)="goToPage(currentPage() + 1)"
            aria-label="Next page"
          >
            <svg siChevronRightIcon class="size-4"></svg>
          </button>
          <button
            type="button"
            class="border-input bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-md border disabled:opacity-50"
            [disabled]="currentPage() === totalPages()"
            (click)="goToPage(totalPages())"
            aria-label="Last page"
          >
            <svg siChevronsRightIcon class="size-4"></svg>
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
