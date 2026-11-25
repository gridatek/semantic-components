import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScStepperItem } from './stepper-item';
import { ScStepperTrigger } from './stepper-trigger';

/**
 * The step's mark, in its trigger: a number or your icon. As the Timeline's
 * markers (the style's `timeline` corners and ring): filled when complete,
 * ringed when current, muted when upcoming, the destructive colour when
 * failed. As large as the style's icon buttons (`--sc-stepper-indicator`).
 */
@Directive({
  selector: 'span[scStepperIndicator]',
  exportAs: 'scStepperIndicator',
  host: {
    '[class]': 'class()',
  },
})
export class ScStepperIndicator {
  private readonly item = inject(ScStepperItem);
  private readonly trigger = inject(ScStepperTrigger, { optional: true });
  private readonly styles = injectStyle();
  /** The style's button text size (`text-sm`, `text-xs`), for the number. */
  private readonly textSize =
    this.styles
      .button({ size: 'icon' })
      .split(/\s+/)
      .find((c) => /^text-(xs|sm|base)$/.test(c)) ?? 'text-sm';

  readonly classInput = input<string>('', { alias: 'class' });

  /** The step's status. */
  readonly status = this.item.status;
  /** The step's place, from 0. */
  readonly step = this.item.index;

  private readonly class = computed(() => {
    const status = this.status();
    return cn(
      'inline-flex size-(--sc-stepper-indicator) shrink-0 items-center justify-center font-medium tabular-nums transition-colors motion-reduce:transition-none',
      this.textSize,
      this.trigger?.twoLines() && 'row-span-2',
      this.styles.timeline.marker,
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
      status === 'current'
        ? cn(
            'bg-background text-foreground ring-primary ring-inset',
            this.styles.timeline.markerRing,
          )
        : status === 'upcoming'
          ? 'bg-muted text-muted-foreground ring-border ring-1 ring-inset'
          : status === 'failed'
            ? 'bg-destructive text-white'
            : 'bg-primary text-primary-foreground',
      this.classInput(),
    );
  });
}
