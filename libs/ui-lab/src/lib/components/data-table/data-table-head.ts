import {
  ChangeDetectionStrategy,
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
  imports: [SiChevronUpIcon, SiChevronDownIcon, SiChevronsUpDownIcon],
  template: `
    @if (sortable()) {
      <button
        type="button"
        class="hover:text-foreground hover:bg-accent -ml-3 flex h-8 items-center gap-1 rounded-md px-3"
        (click)="onSort()"
      >
        <ng-content />
        @if (sortDirection() === 'asc') {
          <svg siChevronUpIcon class="size-4"></svg>
        } @else if (sortDirection() === 'desc') {
          <svg siChevronDownIcon class="size-4"></svg>
        } @else {
          <svg
            siChevronsUpDownIcon
            class="size-4 opacity-0 group-hover:opacity-50"
          ></svg>
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
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]',
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
