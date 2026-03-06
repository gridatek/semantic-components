import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scCommandList]',
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['values'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    'data-slot': 'command-list',
    '[class]': 'class()',
  },
})
export class ScCommandList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('max-h-[300px] overflow-y-auto overflow-x-hidden', this.classInput()),
  );

  private readonly listbox = inject(Listbox);

  constructor() {
    afterRenderEffect(() => this.listbox.scrollActiveItemIntoView());
  }
}
