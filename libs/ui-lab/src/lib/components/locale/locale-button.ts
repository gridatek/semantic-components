import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';
import { ScLocaleService } from './locale.service';
import { LocaleVariant, LocaleSize, variantStyles, sizeStyles } from './styles';

/**
 * Locale button with label - shows current locale with dropdown indicator.
 * For integration with custom menus/dropdowns.
 *
 * @example
 * ```html
 * <button scLocaleButton></button>
 * <a scLocaleButton href="#"></a>
 * ```
 */
@Component({
  selector: 'button[scLocaleButton], a[scLocaleButton]',
  host: {
    'data-slot': 'locale-button',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  imports: [SiChevronDownIcon],
  template: `
    <span class="font-medium">{{ displayLabel() }}</span>
    <svg siChevronDownIcon class="size-4" aria-hidden="true"></svg>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLocaleButton {
  private readonly localeService = inject(ScLocaleService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<LocaleVariant>('ghost');
  readonly size = input<LocaleSize>('default');
  readonly showNativeLabels = input<boolean>(true);

  protected readonly currentLocale = this.localeService.currentLocale;

  protected readonly displayLabel = computed(() => {
    const locale = this.currentLocale();
    return this.showNativeLabels() ? locale.nativeLabel : locale.label;
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
    const current = this.currentLocale();
    return `Current locale: ${current.label}. Click to change locale.`;
  });
}
