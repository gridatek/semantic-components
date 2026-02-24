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
import { ScLanguageService } from './language.service';
import {
  LanguageSwitcherSize,
  LanguageSwitcherVariant,
  sizeStyles,
  variantStyles,
} from './styles';

/**
 * Language toggle button - ideal for switching between 2 languages.
 * Displays a globe icon with the current language code.
 *
 * @example
 * ```html
 * <button scLanguageToggle></button>
 * <button scLanguageToggle variant="outline" size="sm"></button>
 * ```
 */
@Component({
  selector: 'button[scLanguageToggle]',
  host: {
    'data-slot': 'language-toggle',
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
        {{ currentLanguageCode() }}
      </span>
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLanguageToggle {
  private readonly languageService = inject(ScLanguageService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<LanguageSwitcherVariant>('ghost');
  readonly size = input<LanguageSwitcherSize>('default');
  readonly iconOnly = input<boolean>(false);

  protected readonly currentLanguageCode = computed(() =>
    this.languageService.language(),
  );
  protected readonly currentLanguage = this.languageService.currentLanguage;
  protected readonly languages = this.languageService.languages;

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
    const current = this.currentLanguage();
    const langs = this.languages();
    if (langs.length === 2) {
      const next = langs.find((lang) => lang.code !== current.code);
      return `Switch language to ${next?.label ?? 'other language'}. Current language: ${current.label}`;
    }
    return `Current language: ${current.label}. Click to change language.`;
  });

  protected toggle(): void {
    this.languageService.toggleLanguage();
  }
}
