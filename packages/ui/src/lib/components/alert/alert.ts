import { Directive, computed, input } from '@angular/core';
import type { ScAlertVariant } from '@semantic-components/styles';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** An alert's look: its variant, the classes the style's. */
export interface ScAlertVariants {
  variant?: ScAlertVariant | null;
}

/**
 * A callout for something to notice, in the app's style. No role of its own:
 * one already on the page is read in its place. One that appears, to be
 * announced, takes yours — `role="status"` (polite) or `role="alert"`
 * (urgent: interrupts).
 */
@Directive({
  selector: 'div[scAlert]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAlert {
  private readonly styles = injectStyle().alert;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScAlertVariants['variant']>('default');

  private readonly class = computed(() =>
    cn(this.styles.alert({ variant: this.variant() }), this.classInput()),
  );
}
