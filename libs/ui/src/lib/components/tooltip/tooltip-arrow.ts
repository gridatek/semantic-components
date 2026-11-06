import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScTooltipProvider } from './tooltip-provider';

/**
 * The tooltip's arrow, written by you inside it: on the side towards the
 * trigger, at its middle.
 */
@Directive({
  selector: 'span[scTooltipArrow]',
  host: {
    'aria-hidden': 'true',
    '[attr.data-side]': 'tooltip.placedSide()',
    '[class]': 'class()',
  },
})
export class ScTooltipArrow {
  private readonly styles = injectPreset().tooltip;
  protected readonly tooltip = inject(ScTooltipProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute',
      this.styles.arrow,
      // At the middle of its side (Base UI places it by script).
      'data-[side=bottom]:start-[calc(50%-0.3125rem)] data-[side=top]:start-[calc(50%-0.3125rem)]',
      this.classInput(),
    ),
  );
}
