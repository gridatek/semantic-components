import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScTooltipNextProvider } from './tooltip-next-provider';

/**
 * The tooltip, in the preset's look: `role="tooltip"`, described by its
 * trigger while open. The pointer can move onto it (it stays open); it
 * animates in and out.
 */
@Component({
  selector: 'div[scTooltipNext]',
  template: `<ng-content />`,
  host: {
    'data-slot': 'tooltip-content',
    role: 'tooltip',
    '[id]': 'tooltip.id',
    '[attr.data-side]': 'tooltip.placedSide()',
    '[class]': 'class()',
    '(pointerenter)': 'tooltip.keepOpen()',
    '(pointerleave)': 'tooltip.hideSoon()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTooltipNext {
  private readonly styles = injectPreset().tooltip;
  protected readonly tooltip = inject(ScTooltipNextProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('relative duration-100', this.styles.popup, this.classInput()),
  );
}
