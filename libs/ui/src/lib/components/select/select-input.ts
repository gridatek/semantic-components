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
  selector: 'input[scSelectInput]',
  imports: [],
  template: ``,
  hostDirectives: [{ directive: ComboboxInput, inputs: ['value'] }],
  host: {
    'data-slot': 'select-input',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'h-full flex-1 min-w-0 cursor-pointer border-none bg-transparent truncate outline-none',
      this.classInput(),
    ),
  );
}
