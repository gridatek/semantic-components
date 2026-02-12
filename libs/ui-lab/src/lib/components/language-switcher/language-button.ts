import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScLanguageService } from './language.service';
import {
  LanguageSwitcherVariant,
  LanguageSwitcherSize,
  variantStyles,
  sizeStyles,
} from './styles';

/**
 * Language switcher with flag/label display - a more visual option.
 * Shows the current language with option to display as button or link style.
 *
 * @example
 * ```html
 * <button sc-language-button></button>
 * <a sc-language-button href="#"></a>
 * ```
 */
@Component({
  selector: 'button[sc-language-button], a[sc-language-button]',
  host: {
    'data-slot': 'language-button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'onClick($event)',
  },
  template: `
    <span class="font-medium">{{ displayLabel() }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLanguageButton {
  private readonly languageService = inject(ScLanguageService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<LanguageSwitcherVariant>('ghost');
  readonly size = input<LanguageSwitcherSize>('default');
  readonly showNativeLabels = input<boolean>(true);

  protected readonly currentLanguage = this.languageService.currentLanguage;
  protected readonly languages = this.languageService.languages;

  protected readonly displayLabel = computed(() => {
    const lang = this.currentLanguage();
    return this.showNativeLabels() ? lang.nativeLabel : lang.label;
  });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium',
      'ring-offset-background transition-colors cursor-pointer',
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
    return `Current language: ${current.label}. Click to change language.`;
  });

  protected onClick(event: Event): void {
    // For a 2-language setup, toggle directly
    const langs = this.languages();
    if (langs.length === 2) {
      event.preventDefault();
      this.languageService.toggleLanguage();
    }
    // For more languages, this could open a menu (to be implemented by consumer)
  }
}
