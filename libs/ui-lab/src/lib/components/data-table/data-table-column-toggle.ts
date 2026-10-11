import { _IdGenerator } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiSlidersVerticalIcon } from '@semantic-icons/lucide-icons';
import { SC_DATA_TABLE } from './data-table';

/**
 * "Columns" disclosure: a button (`aria-expanded`) that shows a group of
 * checkboxes, one per hideable column. Escape or a click outside closes it.
 */
@Component({
  selector: '[scDataTableColumnToggle]',
  imports: [SiSlidersVerticalIcon],
  template: `
    <button
      #trigger
      type="button"
      class="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium outline-none focus-visible:ring-3"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="panelId"
      (click)="toggleOpen()"
    >
      <svg siSlidersVerticalIcon class="size-4" aria-hidden="true"></svg>
      Columns
    </button>

    <div
      role="group"
      aria-label="Toggle columns"
      class="bg-popover text-popover-foreground absolute end-0 top-full z-50 mt-2 min-w-[150px] rounded-md border p-2 shadow-md"
      [id]="panelId"
      [hidden]="!isOpen()"
    >
      @for (column of table.columns(); track column.id) {
        @if (column.enableHiding !== false) {
          <label
            class="hover:bg-accent has-focus-visible:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
          >
            <input
              type="checkbox"
              class="accent-primary size-4 rounded"
              [checked]="table.isColumnVisible(column.id)"
              (change)="table.toggleColumnVisibility(column.id)"
            />
            {{ column.header }}
          </label>
        }
      }
    </div>
  `,
  host: {
    '[class]': 'class()',
    '(document:click)': 'onDocumentClick($event)',
    '(keydown.escape)': 'close(true)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDataTableColumnToggle {
  readonly table = inject(SC_DATA_TABLE);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly trigger =
    viewChild.required<ElementRef<HTMLButtonElement>>('trigger');

  protected readonly panelId = inject(_IdGenerator).getId(
    'sc-data-table-columns-',
  );

  readonly classInput = input<string>('', { alias: 'class' });

  readonly isOpen = signal(false);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  toggleOpen(): void {
    this.isOpen.update((v) => !v);
  }

  /** Closes the panel; `restoreFocus` moves focus back to the button. */
  close(restoreFocus = false): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    if (restoreFocus) this.trigger().nativeElement.focus();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
