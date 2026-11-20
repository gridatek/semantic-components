import { _IdGenerator } from '@angular/cdk/a11y';
import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineItem } from './timeline-item';

/** What happened, in more words: it describes the event. */
@Directive({
  selector: '[scTimelineDescription]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScTimelineDescription {
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-timeline-description-'));

  private readonly class = computed(() =>
    cn('mt-1 block', this.styles.description, this.classInput()),
  );

  constructor() {
    const item = inject(ScTimelineItem);
    const id = () => this.id();
    item.ɵdescriptions.update((ids) => [...ids, id]);
    inject(DestroyRef).onDestroy(() =>
      item.ɵdescriptions.update((ids) => ids.filter((each) => each !== id)),
    );
  }
}
