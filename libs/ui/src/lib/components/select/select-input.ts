import { ComboboxInput } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelect } from './select';

@Component({
  selector: 'input[scSelectInput]',
  imports: [],
  template: ``,
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'select-input',
    '[class]': 'class()',
    '[value]': 'displayValue()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectInput {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly select = inject(forwardRef(() => ScSelect));

  readonly displayValue = computed(() =>
    this.select.value() != null ? this.select.label() : '',
  );

  protected readonly class = computed(() =>
    cn(
      'h-full flex-1 min-w-0 cursor-pointer border-none bg-transparent truncate outline-none',
      this.classInput(),
    ),
  );
}
