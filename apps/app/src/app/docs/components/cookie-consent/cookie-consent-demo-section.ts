import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { CookieConsentDemo } from './cookie-consent-demo';

@Component({
  selector: 'app-cookie-consent-demo-section',
  imports: [PreviewCodeTabs, CookieConsentDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-cookie-consent-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScCookieConsent, CookiePreferences } from '@semantic-components/ui';

@Component({
  selector: 'app-cookie-consent-demo',
  imports: [ScCookieConsent],
  template: \`
    <div class="space-y-6">
      <!-- Basic Cookie Consent -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Cookie Consent</label>
        <p class="text-sm text-gray-600">
          Interactive cookie consent banner with multi-language support and customizable preferences.
        </p>
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <sc-cookie-consent
            [showLanguageSelector]="true"
            (preferencesChanged)="onPreferencesChanged($event)"
            (consentGiven)="onConsentGiven($event)"
          />
        </div>
      </div>

      <!-- Event Log -->
      @if (events.length > 0) {
        <div class="space-y-2">
          <label class="text-sm font-medium">Events</label>
          <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-2">
            @for (event of events; track $index) {
              <div class="text-sm p-3 bg-white rounded border-l-4 border-blue-500">
                <div class="font-medium">{{ event.type }}</div>
                <div class="text-gray-600 text-xs mt-1">{{ event.timestamp }}</div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentDemo {
  events: Array<{ type: string; timestamp: string }> = [];

  onPreferencesChanged(preferences: CookiePreferences) {
    this.addEvent('Preferences changed');
    console.log('Cookie preferences changed:', preferences);
  }

  onConsentGiven(preferences: CookiePreferences) {
    this.addEvent('Consent given');
    console.log('Cookie consent given:', preferences);
  }

  private addEvent(type: string) {
    this.events.unshift({
      type,
      timestamp: new Date().toLocaleTimeString(),
    });
    if (this.events.length > 5) {
      this.events = this.events.slice(0, 5);
    }
  }
}`;
}
