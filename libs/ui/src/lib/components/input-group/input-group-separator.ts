import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scInputGroupSeparator]',
  host: {
    'data-slot': 'input-group-separator',
    role: 'separator',
    '[attr.aria-orientation]': '"vertical"',
    '[class]': 'class()',
  },
})
export class ScInputGroupSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block bg-border h-full w-px shrink-0', this.classInput()),
  );
}
