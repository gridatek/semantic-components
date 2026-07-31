import { Combobox } from '@angular/aria/combobox';
import {
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
  host: {
    '[class]': 'class()',
    readonly: '',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectInput {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(Combobox);

  private readonly hasValue = computed(() => this.combobox.value() !== '');

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent pl-2.5 outline-none placeholder:text-muted-foreground',
      this.hasValue() && 'opacity-0',
      this.classInput(),
    ),
  );
}
