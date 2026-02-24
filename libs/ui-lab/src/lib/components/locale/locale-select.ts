import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScLocaleService } from './locale.service';

/**
 * Locale select dropdown - shows all available locales.
 *
 * @example
 * ```html
 * <sc-locale-select></sc-locale-select>
 * <sc-locale-select [showNativeLabels]="true"></sc-locale-select>
 * ```
 */
@Component({
  selector: 'sc-locale-select',
  host: {
    'data-slot': 'locale-select',
    '[class]': 'class()',
  },
  template: `
    <label for="locale-select" class="sr-only">Select locale</label>
    <select
      id="locale-select"
      [value]="currentLocaleCode()"
      (change)="onLocaleChange($event)"
      class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      @for (locale of locales(); track locale.code) {
        <option [value]="locale.code">
          {{ showNativeLabels() ? locale.nativeLabel : locale.label }}
        </option>
      }
    </select>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScLocaleSelect {
  private readonly localeService = inject(ScLocaleService);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly showNativeLabels = input<boolean>(true);

  protected readonly currentLocaleCode = computed(() =>
    this.localeService.locale(),
  );
  protected readonly locales = this.localeService.locales;

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected onLocaleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.localeService.setLocale(target.value);
  }
}
