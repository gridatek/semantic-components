import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';

import { CookieService, ScButton, ScCookieConsentDialog } from '@semantic-components/ui';

@Component({
  selector: 'app-cookie-consent-demo',
  imports: [ScCookieConsentDialog, ScButton],
  template: `
    <div class="space-y-6">
      <!-- Service-based Cookie Consent -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Service-based Cookie Consent</label>
        <p class="text-sm text-gray-600">
          Modern service-based approach using Angular CDK dialogs with multi-language support and
          customizable preferences.
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
              <div>
                Consent Dialog Open:
                <span class="font-mono">{{ cookieService.isConsentDialogOpen() }}</span>
              </div>
              <div>
                Preferences Dialog Open:
                <span class="font-mono">{{ cookieService.isPreferencesDialogOpen() }}</span>
              </div>
              <div>
                Current Language:
                <span class="font-mono">{{ cookieService.currentLanguage() }}</span>
              </div>
              <div>
                Should Show Consent:
                <span class="font-mono">{{ cookieService.shouldShowConsent() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Preferences Display -->
      @if (cookieService.getPreferences(); as preferences) {
        <div class="space-y-2">
          <label class="text-sm font-medium">Current Preferences</label>
          <div class="border border-gray-200 rounded-lg p-4 bg-green-50 space-y-2">
            @for (pref of cookieService.getPreferencesArray(); track pref.key) {
              <div class="flex justify-between items-center text-sm">
                <span class="capitalize font-medium">{{ pref.key }}</span>
                <span
                  class="px-2 py-1 rounded text-xs font-medium"
                  [class.bg-green-100]="pref.enabled"
                  [class.text-green-800]="pref.enabled"
                  [class.bg-red-100]="!pref.enabled"
                  [class.text-red-800]="!pref.enabled"
                >
                  {{ pref.enabled ? 'Enabled' : 'Disabled' }}
                </span>
              </div>
            }
          </div>
        </div>
      } @else {
        <div class="space-y-2">
          <label class="text-sm font-medium">Current Preferences</label>
          <div class="border border-gray-200 rounded-lg p-4 bg-yellow-50">
            <p class="text-sm text-yellow-800">
              No preferences set yet. Please accept or customize cookie settings.
            </p>
          </div>
        </div>
      }

      <!-- Service Features -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Service Features</label>
        <div class="border border-gray-200 rounded-lg p-4 bg-blue-50">
          <ul class="text-sm space-y-1 text-blue-800">
            <li>✅ Angular CDK Dialog integration</li>
            <li>✅ Service-based state management</li>
            <li>✅ Template-driven approach</li>
            <li>✅ Reactive signals for state</li>
            <li>✅ Multi-language support</li>
            <li>✅ ShadCN design system</li>
            <li>✅ Customizable positioning</li>
            <li>✅ Auto-show on first visit</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentDemo {
  readonly cookieService = inject(CookieService);

  showConsent() {
    // Clear preferences to show consent dialog
    const consentDialog = document.querySelector('sc-cookie-consent-dialog') as any;
    if (consentDialog) {
      consentDialog.showConsent({
        showLanguageSelector: true,
        position: 'bottom',
        autoShow: false,
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
}
