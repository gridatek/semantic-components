import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_DATA_TABLE } from './data-table';

@Component({
  selector: '[sc-data-table-column-toggle]',
  template: `
    <button
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      (click)="toggleOpen()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="size-4"
      >
        <path d="M12 3v18" />
        <rect width="8" height="4" x="8" y="8" rx="1" />
        <path d="M2 8h2" />
        <path d="M2 12h2" />
        <path d="M20 8h2" />
        <path d="M20 12h2" />
      </svg>
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
    if (!target.closest('[sc-data-table-column-toggle]')) {
      this.isOpen.set(false);
    }
  }
}
