import { Listbox } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scMultiselectList]',
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
    'data-slot': 'multiselect-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex max-h-44 flex-col gap-0.5 overflow-auto', this.classInput()),
  );
}
