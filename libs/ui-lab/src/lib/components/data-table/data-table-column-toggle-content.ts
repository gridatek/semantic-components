import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_DATA_TABLE_COLUMN_TOGGLE } from './data-table-column-toggle';

/** The column panel: a named group, shown while the toggle is open. */
@Directive({
  selector: '[scDataTableColumnToggleContent]',
  host: {
    'data-slot': 'data-table-column-toggle-content',
    role: 'group',
    '[attr.aria-label]': 'ariaLabel()',
    '[id]': 'toggle.panelId',
    '[hidden]': '!toggle.open()',
    '[class]': 'class()',
  },
})
export class ScDataTableColumnToggleContent {
  protected readonly toggle = inject(SC_DATA_TABLE_COLUMN_TOGGLE);
  readonly ariaLabel = input('Toggle columns', { alias: 'aria-label' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground absolute end-0 top-full z-50 mt-2 flex min-w-40 flex-col gap-1 rounded-md border p-2 shadow-md',
      '*:data-[slot=checkbox-field]:rounded-sm *:data-[slot=checkbox-field]:px-2 *:data-[slot=checkbox-field]:py-1.5 *:data-[slot=checkbox-field]:hover:bg-accent',
      this.classInput(),
    ),
  );
}
