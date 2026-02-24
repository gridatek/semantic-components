import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { SiSlidersVerticalIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { SC_DATA_TABLE } from './data-table';

@Component({
  selector: '[scDataTableColumnToggle]',
  imports: [SiSlidersVerticalIcon],
  template: `
    <button
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      (click)="toggleOpen()"
    >
      <svg siSlidersVerticalIcon class="size-4"></svg>
      Columns
    </button>

    @if (isOpen()) {
      <div
        class="absolute right-0 top-full z-50 mt-2 min-w-[150px] rounded-md border bg-popover p-2 shadow-md"
      >
        @for (column of table.columns(); track column.id) {
          @if (column.enableHiding !== false) {
            <label
              class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
            >
              <input
                type="checkbox"
                class="size-4 rounded border-primary"
                [checked]="isColumnVisible(column.id)"
                (change)="toggleColumn(column.id)"
              />
              {{ column.header }}
            </label>
          }
        }
      </div>
    }
  `,
  host: {
    'data-slot': 'data-table-column-toggle',
    '[class]': 'class()',
    '(document:click)': 'onDocumentClick($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDataTableColumnToggle {
  readonly table = inject(SC_DATA_TABLE);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly isOpen = signal(false);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  isColumnVisible(columnId: string): boolean {
    return this.table.columnVisibility()[columnId] !== false;
  }

  toggleColumn(columnId: string): void {
    this.table.toggleColumnVisibility(columnId);
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('[scDataTableColumnToggle]')) {
      this.isOpen.set(false);
    }
  }
}
