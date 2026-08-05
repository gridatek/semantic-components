import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scMessageGroup]',
  host: {
    'data-slot': 'message-group',
    '[class]': 'class()',
  },
})
export class ScMessageGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex min-w-0 flex-col gap-2', this.classInput()),
  );
}
