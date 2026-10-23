import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScLanguageService } from './language.service';

/**
 * Shows the current language; with two, a click switches to the other (with
 * more, open your menu from it). Write its text and icon from `current()`:
 *
 * ```html
 * <button scLanguageButton #language="scLanguageButton">
 *   {{ language.current().nativeLabel }}
 *   <svg siChevronDownIcon></svg>
 * </button>
 * ```
 */
@Directive({
  selector: 'button[scLanguageButton], a[scLanguageButton]',
  exportAs: 'scLanguageButton',
  host: {
    'data-slot': 'language-button',
    '[attr.type]': 'isButton ? "button" : null',
    '[class]': 'class()',
    '(click)': 'onClick($event)',
  },
})
export class ScLanguageButton {
  private readonly buttonStyles = injectPreset().button;

  private readonly languageService = inject(ScLanguageService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('default');

  /** The language in use. */
  readonly current = this.languageService.currentLanguage;

  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName ===
    'BUTTON';

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected onClick(event: Event): void {
    // Two languages: switch directly. More: your menu opens from it.
    if (this.languageService.languages().length === 2) {
      event.preventDefault();
      this.languageService.toggleLanguage();
    }
  }
}
