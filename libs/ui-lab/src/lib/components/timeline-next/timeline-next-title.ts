import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** An event's title: your heading, or text. */
@Directive({
  selector: '[scTimelineNextTitle]',
  host: {
    'data-slot': 'timeline-title',
    '[class]': 'class()',
  },
})
export class ScTimelineNextTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm leading-6 font-medium', this.classInput()),
  );
}
