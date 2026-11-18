import { Directive, computed, input } from '@angular/core';
import type { ScBadgeVariant } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A badge's look: its variant, the classes the style's. */
export interface ScBadgeVariants {
  variant?: ScBadgeVariant | null;
}

/**
 * A badge in the app's style: its classes are the style's
 * (`provideSemanticComponents({ style })`), chosen when the app starts.
 */
@Directive({
  // `a` is included so the style's `[a]:hover:*` classes can match: a badge
  // is only interactive when it is a link.
  selector: 'div[scBadge], span[scBadge], a[scBadge]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBadge {
  private readonly styles = injectStyle().badge;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScBadgeVariants['variant']>('default');

  private readonly class = computed(() =>
    cn(this.styles({ variant: this.variant() }), this.classInput()),
  );
}
