import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiChevronUpIcon,
  SiChevronsUpDownIcon,
} from '@semantic-icons/lucide-icons';
import { SC_DATA_TABLE, SortDirection } from './data-table';

@Component({
  selector: '[scDataTableHead]',
  imports: [
    NgTemplateOutlet,
    SiChevronUpIcon,
    SiChevronDownIcon,
    SiChevronsUpDownIcon,
  ],
  template: `
    <!-- Projected once: an ng-content in both @if branches would fill only one. -->
    <ng-template #content><ng-content /></ng-template>
    @if (sortable()) {
      <button
        type="button"
        class="hover:text-foreground hover:bg-accent -ms-3 flex h-8 items-center gap-1 rounded-md px-3"
        (click)="onSort()"
      >
        <ng-container [ngTemplateOutlet]="content" />
        @if (sortDirection() === 'asc') {
          <svg siChevronUpIcon class="size-4"></svg>
        } @else if (sortDirection() === 'desc') {
          <svg siChevronDownIcon class="size-4"></svg>
        } @else {
          <svg
            siChevronsUpDownIcon
            class="size-4 opacity-0 group-focus-within:opacity-50 group-hover:opacity-50"
          ></svg>
        }
      </button>
    } @else {
      <ng-container [ngTemplateOutlet]="content" />
    }
  `,
  host: {
    '[class]': 'class()',
    '[attr.aria-sort]': 'ariaSort()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDataTableHead {
  private readonly table = inject(SC_DATA_TABLE);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly columnId = input<string>('');
  readonly sortable = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'h-10 px-2 text-start align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pe-0 *:[[role=checkbox]]:translate-y-[2px]',
      'group',
      this.columnId() &&
        !this.table.isColumnVisible(this.columnId()) &&
        'hidden',
      this.classInput(),
    ),
  );

  protected readonly sortDirection = computed((): SortDirection => {
    const sorting = this.table.sorting();
    if (!sorting || sorting.id !== this.columnId()) return null;
    return sorting.desc ? 'desc' : 'asc';
  });

  protected readonly ariaSort = computed(() => {
    if (!this.sortable()) return null;
    const direction = this.sortDirection();
    return direction === 'asc'
      ? 'ascending'
      : direction === 'desc'
        ? 'descending'
        : 'none';
  });

  onSort(): void {
    const id = this.columnId();
    if (id) {
      this.table.toggleSort(id);
    }
  }
}
