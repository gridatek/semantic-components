import { ComboboxInput } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'input[scMultiselectInput]',
  imports: [],
  template: ``,
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'multiselect-input',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'h-full flex-1 min-w-0 cursor-pointer border-none bg-transparent truncate outline-none',
      this.classInput(),
    ),
  );
}
