import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scBubbleGroup]',
  host: {
    'data-slot': 'bubble-group',
    '[class]': 'class()',
  },
})
export class ScBubbleGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex min-w-0 flex-col gap-2', this.classInput()),
  );
}
