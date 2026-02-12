import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_DATA_TABLE, SortDirection } from './data-table';

@Component({
  selector: '[sc-data-table-head]',
  template: `
    @if (sortable()) {
      <button
        type="button"
        class="flex items-center gap-1 hover:text-foreground -ml-3 h-8 px-3 rounded-md hover:bg-accent"
        (click)="onSort()"
      >
        <ng-content />
        @if (sortDirection() === 'asc') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4"
          >
            <path d="m5 15 7-7 7 7" />
          </svg>
        } @else if (sortDirection() === 'desc') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4"
          >
            <path d="m19 9-7 7-7-7" />
          </svg>
        } @else {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="size-4 opacity-0 group-hover:opacity-50"
          >
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
          </svg>
        }
      </button>
    } @else {
      <ng-content />
    }
  `,
  host: {
    'data-slot': 'data-table-head',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDataTableHead {
  private readonly table = inject(SC_DATA_TABLE);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly columnId = input<string>('');
  readonly sortable = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      'group',
      this.classInput(),
    ),
  );

  protected readonly sortDirection = computed((): SortDirection => {
    const sorting = this.table.sorting();
    if (!sorting || sorting.id !== this.columnId()) return null;
    return sorting.desc ? 'desc' : 'asc';
  });

  onSort(): void {
    const id = this.columnId();
    if (id) {
      this.table.toggleSort(id);
    }
  }
}
