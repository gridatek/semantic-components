import { Listbox } from '@angular/aria/listbox';
import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-command-list]',
  hostDirectives: [Listbox],
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
}
