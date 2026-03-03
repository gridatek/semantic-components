import { Option } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scAutocompleteItem]',
  hostDirectives: [{ directive: Option, inputs: ['value', 'label'] }],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'autocomplete-item',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAutocompleteItem {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:text-accent-foreground aria-selected:bg-accent flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none select-none aria-selected:font-medium',
      this.classInput(),
    ),
  );
}
