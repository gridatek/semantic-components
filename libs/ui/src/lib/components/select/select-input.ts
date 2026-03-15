import { ComboboxInput } from '@angular/aria/combobox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'input[scSelectInput]',
  imports: [],
  template: ``,
  hostDirectives: [ComboboxInput],
  host: {
    'data-slot': 'select-input',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectInput {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly comboboxInput = inject(ComboboxInput);

  private readonly hasValue = computed(() => this.comboboxInput.value() !== '');

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent pl-2.5 outline-none placeholder:text-muted-foreground',
      this.hasValue() && 'opacity-0',
      this.classInput(),
    ),
  );
}
