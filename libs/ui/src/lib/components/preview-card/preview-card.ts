import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScPreviewCardProvider } from './preview-card-provider';

/**
 * The card, in the style's look. No role and no link to its trigger: it is
 * a visual preview (Base UI's guidance) — what it shows must be at the
 * link's destination too. The pointer can move onto it (it stays open); it
 * animates in and out.
 */
@Directive({
  selector: 'div[scPreviewCard]',
  host: {
    '[attr.data-side]': 'card.placedSide()',
    '[class]': 'class()',
    '(pointerenter)': 'card.keepOpen()',
    '(pointerleave)': 'card.hideSoon()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95',
  },
})
export class ScPreviewCard {
  private readonly styles = injectStyle().previewCard;
  private readonly card = inject(ScPreviewCardProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.popup, this.classInput()),
  );
}
