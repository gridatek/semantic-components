import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-combobox-list]',
  imports: [],
  template: `
    <ng-content />
  `,
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['values', 'multi'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    'data-slot': 'combobox-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'max-h-[300px] overflow-y-auto overflow-x-hidden p-1',
      this.classInput(),
    ),
  );
}
