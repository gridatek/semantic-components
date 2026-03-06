import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scCommandInputGroup]',
  host: {
    'data-slot': 'command-input-group',
    '[class]': 'class()',
  },
})
export class ScCommandInputGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center h-8 rounded-lg border border-input/30 bg-input/30 px-2',
      this.classInput(),
    ),
  );
}
