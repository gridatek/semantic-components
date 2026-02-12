import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_DATA_TABLE } from './data-table';

@Component({
  selector: 'input[sc-data-table-filter]',
  template: ``,
  host: {
    'data-slot': 'data-table-filter',
    type: 'text',
    '[class]': 'class()',
    '[value]': 'table.globalFilter()',
    '(input)': 'onInput($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDataTableFilter {
  readonly table = inject(SC_DATA_TABLE);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('Filter...');

  protected readonly class = computed(() =>
    cn(
      'flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.table.globalFilter.set(value);
  }
}
