import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScTimelineNextItem } from './timeline-next-item';

/** What happened, in more words: it describes the event. */
@Directive({
  selector: '[scTimelineNextDescription]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScTimelineNextDescription {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-timeline-description-'));

  private readonly class = computed(() =>
    cn('text-muted-foreground mt-1 block text-sm', this.classInput()),
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
