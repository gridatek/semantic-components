import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScHoverCardNextProvider } from './hover-card-next-provider';

/**
 * The card, in the preset's look. No role and no link to its trigger: it is
 * a visual preview (Base UI's guidance) — what it shows must be at the
 * link's destination too. The pointer can move onto it (it stays open); it
 * animates in and out.
 */
@Directive({
  selector: 'div[scHoverCardNext]',
  host: {
    '[attr.data-side]': 'card.placedSide()',
    '[class]': 'class()',
    '(pointerenter)': 'card.keepOpen()',
    '(pointerleave)': 'card.hideSoon()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
})
export class ScHoverCardNext {
  private readonly styles = injectPreset().hoverCard;
  protected readonly card = inject(ScHoverCardNextProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.popup, this.classInput()),
  );
}
