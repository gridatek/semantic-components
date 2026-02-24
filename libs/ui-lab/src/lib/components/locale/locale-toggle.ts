import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiGlobeIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { ScLocaleService } from './locale.service';
import { LocaleSize, LocaleVariant, sizeStyles, variantStyles } from './styles';

/**
 * Locale toggle button - ideal for switching between 2 locales.
 * Displays a globe icon with the current locale code.
 *
 * @example
 * ```html
 * <button scLocaleToggle></button>
 * <button scLocaleToggle variant="outline" size="sm"></button>
 * ```
 */
@Component({
  selector: 'button[scLocaleToggle]',
  host: {
    'data-slot': 'locale-toggle',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'toggle()',
  },
  imports: [SiGlobeIcon],
  template: `
    <svg siGlobeIcon class="size-5" aria-hidden="true"></svg>
    @if (!iconOnly()) {
      <span class="text-xs font-semibold uppercase">
        {{ currentLocaleCode() }}
      </span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLocaleToggle {
  private readonly localeService = inject(ScLocaleService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<LocaleVariant>('ghost');
  readonly size = input<LocaleSize>('default');
  readonly iconOnly = input<boolean>(false);

  protected readonly currentLocaleCode = computed(() =>
    this.localeService.locale(),
  );
  protected readonly currentLocale = this.localeService.currentLocale;
  protected readonly locales = this.localeService.locales;

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium',
      'ring-offset-background transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      variantStyles[this.variant()],
      sizeStyles[this.size()],
      this.classInput(),
    ),
  );

  protected readonly ariaLabel = computed(() => {
    const current = this.currentLocale();
    const langs = this.locales();
    if (langs.length === 2) {
      const next = langs.find((l) => l.code !== current.code);
      return `Switch locale to ${next?.label ?? 'other locale'}. Current locale: ${current.label}`;
    }
    return `Current locale: ${current.label}. Click to change locale.`;
  });

  protected toggle(): void {
    this.localeService.toggleLocale();
  }
}
