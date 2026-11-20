import { _IdGenerator } from '@angular/cdk/a11y';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineNextItem } from './timeline-next-item';

/** The event's title, on your heading or any element: it names the event. */
@Directive({
  selector: '[scTimelineNextTitle]',
  host: {
    '[id]': 'id()',
    '[class]': 'class()',
  },
})
export class ScTimelineNextTitle {
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-timeline-title-'));

  private readonly class = computed(() =>
    cn(
      'block leading-(--sc-timeline-line)',
      this.styles.title,
      this.classInput(),
    ),
  );

  constructor() {
    const item = inject(ScTimelineNextItem);
    item.ɵtitle.set(() => this.id());
  }
}
