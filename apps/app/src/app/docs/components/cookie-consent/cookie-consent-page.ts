import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { CookieConsentDemoSection } from './cookie-consent-demo-section';

@Component({
  selector: 'app-cookie-consent-page',
  imports: [CookieConsentDemoSection],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Page Header -->
      <div class="space-y-4">
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Cookie Consent
        </h1>
        <p class="text-xl text-muted-foreground">
          A GDPR-compliant cookie consent banner with multi-language support and customizable
          preferences for managing user privacy settings.
        </p>
      </div>

      <!-- Main Demo -->
      <app-cookie-consent-demo-section />

      <!-- Features Section -->
      <div class="space-y-8">
        <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Features</h2>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">🌍 Multi-language Support</h3>
            <p class="text-muted-foreground">
              Built-in translations for English, Spanish, French, and German with easy
              extensibility.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">⚙️ Customizable Preferences</h3>
            <p class="text-muted-foreground">
              Granular control over necessary, analytics, marketing, and functional cookies.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">🔒 GDPR Compliant</h3>
            <p class="text-muted-foreground">
              Follows privacy regulations with clear consent mechanisms and easy opt-out options.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">💾 Persistent Storage</h3>
            <p class="text-muted-foreground">
              Automatically saves user preferences in localStorage with service integration.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">🎨 Accessible Design</h3>
            <p class="text-muted-foreground">
              Fully accessible with proper ARIA labels, keyboard navigation, and screen reader
              support.
            </p>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold">📱 Responsive Layout</h3>
            <p class="text-muted-foreground">
              Optimized for all screen sizes with mobile-friendly touch interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentPage {}
