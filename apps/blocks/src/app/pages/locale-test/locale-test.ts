import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ScLocaleManager } from '../../core/locale';
import { LocaleSelect } from '../../components/locale-select/locale-select';

@Component({
  selector: 'app-locale-test',
  imports: [DatePipe, DecimalPipe, CurrencyPipe, LocaleSelect],
  template: `
    <div class="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Locale Pipe Test</h1>
        <app-locale-select />
      </div>

      <p class="text-muted-foreground">
        Current locale:
        <strong>{{ locale() }}</strong>
      </p>

      <!-- Date -->
      <section class="rounded-lg border p-6 space-y-3">
        <h2 class="text-lg font-semibold">DatePipe</h2>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <span class="text-muted-foreground">short</span>
          <span>{{ sampleDate | date: 'short' : undefined : locale() }}</span>

          <span class="text-muted-foreground">medium</span>
          <span>{{ sampleDate | date: 'medium' : undefined : locale() }}</span>

          <span class="text-muted-foreground">long</span>
          <span>{{ sampleDate | date: 'long' : undefined : locale() }}</span>

          <span class="text-muted-foreground">full</span>
          <span>{{ sampleDate | date: 'full' : undefined : locale() }}</span>
        </div>
      </section>

      <!-- Number -->
      <section class="rounded-lg border p-6 space-y-3">
        <h2 class="text-lg font-semibold">DecimalPipe</h2>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <span class="text-muted-foreground">default</span>
          <span>{{ sampleNumber | number: undefined : locale() }}</span>

          <span class="text-muted-foreground">1.2-2</span>
          <span>{{ sampleNumber | number: '1.2-2' : locale() }}</span>

          <span class="text-muted-foreground">1.0-0</span>
          <span>{{ sampleNumber | number: '1.0-0' : locale() }}</span>
        </div>
      </section>

      <!-- Currency -->
      <section class="rounded-lg border p-6 space-y-3">
        <h2 class="text-lg font-semibold">CurrencyPipe</h2>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <span class="text-muted-foreground">USD</span>
          <span>
            {{
              sampleCurrency | currency: 'USD' : 'symbol' : undefined : locale()
            }}
          </span>

          <span class="text-muted-foreground">EUR</span>
          <span>
            {{
              sampleCurrency | currency: 'EUR' : 'symbol' : undefined : locale()
            }}
          </span>

          <span class="text-muted-foreground">MAD</span>
          <span>
            {{
              sampleCurrency | currency: 'MAD' : 'symbol' : undefined : locale()
            }}
          </span>
        </div>
      </section>
    </div>
  `,
  host: {
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LocaleTest {
  private readonly localeManager = inject(ScLocaleManager);

  protected readonly locale = this.localeManager.locale;

  protected readonly sampleDate = new Date(2026, 1, 24, 14, 30, 0);
  protected readonly sampleNumber = 1234567.891;
  protected readonly sampleCurrency = 9876.5;
}
