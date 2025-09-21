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

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { CookieService, ScCookieConsentDialog, ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-cookie-consent-demo',
  imports: [ScCookieConsentDialog, ScButton],
  template: \`
    <div class="space-y-6">
      <!-- Service-based Cookie Consent -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Service-based Cookie Consent</label>
        <p class="text-sm text-gray-600">
          Modern service-based approach using Angular CDK dialogs with multi-language support and customizable preferences.
        </p>

        <!-- Cookie Consent Dialog Component (handles templates automatically) -->
        <sc-cookie-consent-dialog />

        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
          <div class="flex flex-wrap gap-3">
            <button [variant]="'primary'" (click)="showConsent()" sc-button>
              Show Cookie Consent
            </button>
            <button [variant]="'secondary'" (click)="showPreferences()" sc-button>
              Show Preferences
            </button>
            <button [variant]="'outline'" (click)="clearPreferences()" sc-button>
              Clear Preferences
            </button>
          </div>

          <!-- Current Status -->
          <div class="space-y-2">
            <h4 class="font-medium">Current Status:</h4>
            <div class="text-sm space-y-1">
              <div>Consent Dialog Open: <span class="font-mono">{{ cookieService.isConsentDialogOpen() }}</span></div>
              <div>Preferences Dialog Open: <span class="font-mono">{{ cookieService.isPreferencesDialogOpen() }}</span></div>
              <div>Current Language: <span class="font-mono">{{ cookieService.currentLanguage() }}</span></div>
              <div>Should Show Consent: <span class="font-mono">{{ cookieService.shouldShowConsent() }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentDemo {
  readonly cookieService = inject(CookieService);

  showConsent() {
    const consentDialog = document.querySelector('sc-cookie-consent-dialog') as any;
    if (consentDialog) {
      consentDialog.showConsent({
        showLanguageSelector: true,
        position: 'bottom-center',
        autoShow: false
      });
    }
  }

  showPreferences() {
    const consentDialog = document.querySelector('sc-cookie-consent-dialog') as any;
    if (consentDialog) {
      consentDialog.showPreferences();
    }
  }

  clearPreferences() {
    this.cookieService.clearPreferences();
  }
}`;
}
