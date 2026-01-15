import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

import { ScButton } from '../button/button';
import { ScCard } from '../card/card';
import { ScOptionLegacy } from '../select-legacy/option-legacy';
import { ScSelectLegacy } from '../select-legacy/select-legacy';
import { ScSwitch } from '../switch/switch';
import { CookieConsentOptions, CookiePreferences, CookieService } from './cookie.service';

// Component variants for styling with CSS positioning
export const cookieConsentVariants = cva(
  'fixed bottom-0 p-4 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      position: {
        'bottom-left': 'left-0',
        'bottom-center': 'left-1/2 -translate-x-1/2',
        'bottom-right': 'right-0',
      },
    },
    defaultVariants: {
      position: 'bottom-center',
    },
  },
);

export const cookieConsentContentVariants = cva(
  'bg-background border shadow-lg p-6 rounded-t-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  {
    variants: {
      position: {
        'bottom-left': 'w-full max-w-lg',
        'bottom-center': 'w-full max-w-2xl',
        'bottom-right': 'w-full max-w-lg',
      },
    },
    defaultVariants: {
      position: 'bottom-center',
    },
  },
);

export type CookieConsentVariants = VariantProps<typeof cookieConsentVariants>;

@Component({
  selector: 'sc-cookie-consent-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ScButton,
    ScCard,
    ScSelectLegacy,
    ScOptionLegacy,
    ScSwitch,
  ],
  template: `
    <!-- Cookie Consent Template -->
    <ng-template #consentTemplate>
      <div [class]="consentOverlayClass()" [attr.data-state]="'open'">
        <div [class]="consentContentClass()" [attr.data-state]="'open'">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <svg
                class="size-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h2 class="text-xl font-semibold tracking-tight">
                {{ cookieService.getTranslation('title') }}
              </h2>
            </div>
            @if (options().showLanguageSelector) {
              <div class="flex items-center gap-2">
                <svg
                  class="size-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <sc-select-legacy
                  class="w-24 text-sm"
                  [ngModel]="cookieService.currentLanguage()"
                  (ngModelChange)="onLanguageChange($event)"
                >
                  <sc-option-legacy value="en">English</sc-option-legacy>
                  <sc-option-legacy value="es">Español</sc-option-legacy>
                  <sc-option-legacy value="fr">Français</sc-option-legacy>
                  <sc-option-legacy value="de">Deutsch</sc-option-legacy>
                </sc-select-legacy>
              </div>
            }
          </div>
          <p class="text-muted-foreground mb-6 leading-relaxed">
            {{ cookieService.getTranslation('description') }}
          </p>
          <div class="flex flex-wrap gap-3 mb-4">
            <button [variant]="'primary'" (click)="cookieService.acceptAllCookies()" sc-button>
              {{ cookieService.getTranslation('acceptAll') }}
            </button>
            <button [variant]="'secondary'" (click)="cookieService.rejectAllCookies()" sc-button>
              {{ cookieService.getTranslation('rejectAll') }}
            </button>
            <button [variant]="'outline'" (click)="showPreferences()" sc-button>
              <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {{ cookieService.getTranslation('customize') }}
            </button>
          </div>
          <div class="flex gap-4 text-sm">
            <a
              class="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#"
            >
              {{ cookieService.getTranslation('privacyPolicy') }}
            </a>
            <a
              class="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#"
            >
              {{ cookieService.getTranslation('cookiePolicy') }}
            </a>
          </div>
        </div>
      </div>
    </ng-template>

    <!-- Preferences Template -->
    <ng-template #preferencesTemplate>
      <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div
          class="bg-background w-full max-w-2xl rounded-lg border shadow-lg max-h-[90vh] overflow-y-auto p-6"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold tracking-tight">
              {{ cookieService.getTranslation('cookiePreferences') }}
            </h2>
            <div class="flex items-center gap-3">
              @if (options().showLanguageSelector) {
                <div class="flex items-center gap-2">
                  <svg
                    class="size-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <sc-select-legacy
                    class="w-24 text-sm"
                    [ngModel]="cookieService.currentLanguage()"
                    (ngModelChange)="onLanguageChange($event)"
                  >
                    <sc-option-legacy value="en">English</sc-option-legacy>
                    <sc-option-legacy value="es">Español</sc-option-legacy>
                    <sc-option-legacy value="fr">Français</sc-option-legacy>
                    <sc-option-legacy value="de">Deutsch</sc-option-legacy>
                  </sc-select-legacy>
                </div>
              }
              <button
                [variant]="'ghost'"
                [size]="'icon'"
                (click)="cookieService.closeAllDialogs()"
                sc-button
                aria-label="Close preferences"
              >
                <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="space-y-6">
            @for (category of cookieService.cookieCategories; track category.key) {
              <div class="p-4" sc-card>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <span class="text-xl">{{ category.icon }}</span>
                    <h3 class="font-semibold">
                      {{ cookieService.getTranslation(category.key) }}
                    </h3>
                  </div>
                  <input
                    [checked]="tempPreferences()[category.key]"
                    [disabled]="category.key === 'necessary'"
                    [attr.aria-label]="'Toggle ' + cookieService.getTranslation(category.key)"
                    (checkedChange)="togglePreference(category.key, $event)"
                    sc-switch
                    type="checkbox"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ cookieService.getTranslation(category.key + 'Desc') }}
                </p>
              </div>
            }
          </div>
          <div class="flex gap-3 mt-8">
            <button class="flex-1" [variant]="'primary'" (click)="savePreferences()" sc-button>
              <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {{ cookieService.getTranslation('savePreferences') }}
            </button>
            <button [variant]="'outline'" (click)="cancelPreferences()" sc-button>
              {{ cookieService.getTranslation('cancel') }}
            </button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCookieConsentDialog implements AfterViewInit {
  readonly cookieService = inject(CookieService);

  readonly consentTemplate = viewChild.required<TemplateRef<unknown>>('consentTemplate');
  readonly preferencesTemplate = viewChild.required<TemplateRef<unknown>>('preferencesTemplate');

  readonly options = signal<CookieConsentOptions>({
    showLanguageSelector: true,
    position: 'bottom-center',
    autoShow: true,
  });

  readonly tempPreferences = signal<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  // Computed classes using the variants
  readonly consentOverlayClass = () =>
    cn(cookieConsentVariants({ position: this.options().position }));

  readonly consentContentClass = () =>
    cn(cookieConsentContentVariants({ position: this.options().position }));

  ngAfterViewInit() {
    // Auto-show consent if needed
    this.cookieService.checkAndShowConsent(this.consentTemplate(), this.options());
  }

  showConsent(options?: CookieConsentOptions) {
    if (options) {
      this.options.set({ ...this.options(), ...options });
    }
    this.cookieService.showConsentDialog(this.consentTemplate(), this.options());
  }

  showPreferences() {
    // Initialize temp preferences with current values
    const current = this.cookieService.getPreferences() || {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    this.tempPreferences.set(current);

    this.cookieService.closeAllDialogs();
    this.cookieService.showPreferencesDialog(this.preferencesTemplate());
  }

  togglePreference(type: keyof CookiePreferences, checked: boolean) {
    if (type === 'necessary') return; // Can't disable necessary cookies

    this.tempPreferences.update((prefs) => ({
      ...prefs,
      [type]: checked,
    }));
  }

  savePreferences() {
    this.cookieService.saveCustomPreferences(this.tempPreferences());
  }

  cancelPreferences() {
    // Reset temp preferences to original values (discarding changes)
    const current = this.cookieService.getPreferences() || {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    this.tempPreferences.set(current);

    // Close preferences dialog and reopen consent dialog
    this.cookieService.closeAllDialogs();

    // Only reopen consent if no preferences were previously saved
    if (!this.cookieService.getPreferences()) {
      this.cookieService.showConsentDialog(this.consentTemplate(), this.options());
    }
  }

  onLanguageChange(value: string) {
    this.cookieService.setLanguage(value);
  }
}
