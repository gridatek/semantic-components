import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { SC_TOOLTIP_CONTEXT } from './tooltip-context';

/**
 * The tooltip, in the preset's look: `role="tooltip"`, described by its
 * trigger while open. The pointer can move onto it (it stays open); it
 * animates in and out.
 */
@Directive({
  selector: 'div[scTooltip]',
  host: {
    'data-slot': 'tooltip',
    role: 'tooltip',
    '[id]': 'tooltip.id',
    '[attr.data-side]': 'tooltip.placedSide()',
    '[class]': 'class()',
    '(pointerenter)': 'tooltip.keepOpen()',
    '(pointerleave)': 'tooltip.hideSoon()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
})
export class ScTooltip {
  private readonly styles = injectPreset().tooltip;
  protected readonly tooltip = inject(SC_TOOLTIP_CONTEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative duration-100', this.styles.popup, this.classInput()),
  );
}
