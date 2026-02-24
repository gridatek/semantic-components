import { computed, Directive, inject, input } from '@angular/core';
import { buttonVariants, cn, ScButtonVariants } from '@semantic-components/ui';
import { ScLocaleManager } from './locale-manager';

/**
 * Locale button directive - shows button styling for locale actions.
 * For integration with custom menus/dropdowns.
 *
 * @example
 * ```html
 * <button scLocaleButton aria-label="Change locale">
 *   English (US)
 *   <svg siChevronDownIcon class="size-4"></svg>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scLocaleButton], a[scLocaleButton]',
  host: {
    'data-slot': 'locale-button',
    '[class]': 'class()',
  },
})
export class ScLocaleButton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
