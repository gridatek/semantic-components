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

/**
 * Language select dropdown - ideal for multiple languages.
 * Shows a dropdown with all available languages.
 *
 * @example
 * ```html
 * <sc-language-select></sc-language-select>
 * <sc-language-select [showNativeLabels]="true"></sc-language-select>
 * ```
 */
@Component({
  selector: 'sc-language-select',
  host: {
    'data-slot': 'language-select',
    '[class]': 'class()',
  },
  template: `
    <label for="language-select" class="sr-only">Select language</label>
    <select
      id="language-select"
      [value]="currentLanguageCode()"
      (change)="onLanguageChange($event)"
      class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      @for (lang of languages(); track lang.code) {
        <option [value]="lang.code">
          {{ showNativeLabels() ? lang.nativeLabel : lang.label }}
        </option>
      }
    </select>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLanguageSelect {
  private readonly languageService = inject(ScLanguageService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showNativeLabels = input<boolean>(true);

  protected readonly currentLanguageCode = computed(() =>
    this.languageService.language(),
  );
  protected readonly languages = this.languageService.languages;

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.languageService.setLanguage(target.value);
  }
}
