import { computed, Directive, inject, input } from '@angular/core';
import { cn, toggleVariants, ScToggleVariants } from '@semantic-components/ui';
import { ScLocaleManager } from './locale-manager';

/**
 * Locale toggle directive - ideal for switching between 2 locales.
 * Toggles between 2 configured locales on click.
 *
 * @example
 * ```html
 * <button scLocaleToggle aria-label="Switch language">
 *   <svg siGlobeIcon class="size-5"></svg>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scLocaleToggle]',
  host: {
    'data-slot': 'locale-toggle',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScLocaleToggle {
  private readonly localeManager = inject(ScLocaleManager);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected toggle(): void {
    this.localeManager.toggleLocale();
  }
}
