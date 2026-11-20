import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScTimelineNextItem } from './timeline-next-item';

/**
 * When the event was: your `<time>`, its `datetime` machine-readable, its
 * text in your words. It describes the event.
 */
@Directive({
  selector: 'time[scTimelineNextTime]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScTimelineNextTime {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-timeline-time-'));

  private readonly class = computed(() =>
    cn('text-muted-foreground block text-xs', this.classInput()),
  );

  constructor() {
    const item = inject(ScTimelineNextItem);
    const id = () => this.id();
    item.ɵdescriptions.update((ids) => [...ids, id]);
    inject(DestroyRef).onDestroy(() =>
      item.ɵdescriptions.update((ids) => ids.filter((each) => each !== id)),
    );
  }
}
