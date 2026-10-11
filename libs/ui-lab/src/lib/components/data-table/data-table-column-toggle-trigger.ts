import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_DATA_TABLE_COLUMN_TOGGLE } from './data-table-column-toggle';

/** Opens/closes the column panel (`aria-expanded`). Its content is yours. */
@Directive({
  selector: 'button[scDataTableColumnToggleTrigger]',
  host: {
    type: 'button',
    '[attr.aria-expanded]': 'toggle.open()',
    '[attr.aria-controls]': 'toggle.panelId',
    '(click)': 'toggle.toggle()',
    '[class]': 'class()',
  },
})
export class ScDataTableColumnToggleTrigger {
  protected readonly toggle = inject(SC_DATA_TABLE_COLUMN_TOGGLE);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    this.toggle.trigger.set(
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement,
    );
  }
}
