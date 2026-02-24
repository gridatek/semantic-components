import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { cn } from '@semantic-components/ui';
import { ScLocaleManager } from '../../core/locale';

@Component({
  selector: 'app-locale-select',
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
      class="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      @for (locale of supportedLocales; track locale.code) {
        <option [value]="locale.code">
          {{ locale.nativeLabel }}
        </option>
      }
    </select>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSelect {
  private readonly document = inject(DOCUMENT);
  private readonly localeManager = inject(ScLocaleManager);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly supportedLocales = this.localeManager.supportedLocales;
  protected readonly currentLocaleCode = this.localeManager.locale;

  protected readonly class = computed(() =>
    cn('inline-block', this.classInput()),
  );

  protected onLocaleChange(event: Event): void {
    const code = (event.target as HTMLSelectElement).value;
    this.localeManager.setLocale(code);
    this.document.defaultView?.location.reload();
  }
}
