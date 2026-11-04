import { Directive, computed, input } from '@angular/core';
import type { ScBadgeVariant } from '@semantic-components/presets';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A badge's look: its variant, the classes the preset's. */
export interface ScBadgeVariants {
  variant?: ScBadgeVariant | null;
}

/**
 * A badge in the app's preset: its classes are the preset's
 * (`provideScConfig({ preset })`), chosen when the app starts.
 */
@Directive({
  // `a` is included so the preset's `[a]:hover:*` classes can match: a badge
  // is only interactive when it is a link.
  selector: 'div[scBadge], span[scBadge], a[scBadge]',
  host: {
    '[class]': 'class()',
  },
})
export class ScBadge {
  private readonly styles = injectPreset().badge;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScBadgeVariants['variant']>('default');

  protected readonly class = computed(() =>
    cn(this.styles({ variant: this.variant() }), this.classInput()),
  );
}
