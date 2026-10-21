import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimeline } from './timeline';
import { ScTimelineItem } from './timeline-item';

/**
 * An event's marker — a dot, or your icon in it — and the line from it to
 * the next: solid after what is done, dashed after the rest. Decorative.
 */
@Component({
  selector: '[scTimelineMarker]',
  template: `
    <span [class]="dot()" data-slot="timeline-dot"><ng-content /></span>
  `,
  host: {
    'data-slot': 'timeline-marker',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimelineMarker {
  private readonly timeline = inject(ScTimeline);
  private readonly item = inject(ScTimelineItem);

  readonly classInput = input<string>('', { alias: 'class' });
  /** An error, a failure: in the destructive colour. */
  readonly variant = input<'default' | 'destructive'>('default');

  protected readonly dot = computed(() => {
    const status = this.item.status();
    return cn(
      'relative z-10 grid size-3 shrink-0 place-items-center rounded-full has-[svg]:size-6 [&_svg]:size-3.5',
      status === 'done' && 'bg-primary text-primary-foreground',
      status === 'current' &&
        'bg-primary text-primary-foreground ring-primary/20 ring-4',
      status === 'upcoming' &&
        'border-border bg-background text-muted-foreground border-2',
      this.variant() === 'destructive' &&
        'bg-destructive ring-destructive/20 border-transparent text-white',
    );
  });

  protected readonly class = computed(() => {
    const solid = this.item.status() === 'done';
    const line = cn(
      'after:border-solid',
      solid
        ? 'after:border-primary'
        : 'after:border-border after:border-dashed',
      'group-last/item:after:hidden',
    );
    if (this.timeline.orientation() === 'horizontal') {
      // A row: the dot, then the line to the next.
      return cn(
        'flex h-6 items-center gap-2 after:flex-1 after:border-t-2',
        line,
        this.classInput(),
      );
    }
    // A column: the dot, then the line down to the next (through the gap).
    return cn(
      'col-start-2 row-start-1 flex w-6 flex-col items-center gap-1 pt-1.5 has-[svg]:pt-0',
      'after:-mb-8 after:flex-1 after:border-s-2',
      line,
      this.classInput(),
    );
  });
}
