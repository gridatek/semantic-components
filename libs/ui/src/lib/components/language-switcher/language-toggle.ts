import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScLanguageService } from './language.service';

/**
 * Switches to the next language (made for two). Write its icon, the current
 * language's code if you show it, and its name — from `current()` and `next()`:
 *
 * ```html
 * <button scLanguageToggle #toggle="scLanguageToggle">
 *   <svg siGlobeIcon></svg>
 *   {{ toggle.current().code }}
 *   <span class="sr-only">Switch to {{ toggle.next().label }}</span>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scLanguageToggle]',
  exportAs: 'scLanguageToggle',
  host: {
    type: 'button',
    'data-slot': 'language-toggle',
    '[class]': 'class()',
    '(click)': 'toggle()',
  },
})
export class ScLanguageToggle {
  private readonly buttonStyles = injectPreset().button;

  private readonly languageService = inject(ScLanguageService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  /** The language in use. */
  readonly current = this.languageService.currentLanguage;

  /** The language a click switches to. */
  readonly next = computed(() => {
    const languages = this.languageService.languages();
    const index = languages.findIndex(
      (language) => language.code === this.current().code,
    );
    return languages[(index + 1) % languages.length];
  });

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'uppercase',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLanguageToggle');
  }

  protected toggle(): void {
    this.languageService.toggleLanguage();
  }
}
