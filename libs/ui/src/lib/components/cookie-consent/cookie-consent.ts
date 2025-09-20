import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  LOCALE_ID,
  OnInit,
  Output,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

import { ScButton } from '../button/button';
import { ScCard } from '../card/card';
import { ScSwitch } from '../switch/switch';
import { CookiePreferences } from './cookie.service';

export const cookieConsentVariants = cva(
  'fixed inset-0 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      position: {
        bottom: 'flex items-end justify-center',
        center: 'flex items-center justify-center',
        top: 'flex items-start justify-center pt-4',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
);

export const cookieConsentContentVariants = cva(
  'grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  {
    variants: {
      position: {
        bottom:
          'max-w-4xl mx-4 mb-4 rounded-lg data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        center:
          'max-w-2xl mx-4 rounded-lg data-[state=closed]:slide-out-to-bottom-[48%] data-[state=open]:slide-in-from-bottom-[48%]',
        top: 'max-w-4xl mx-4 mt-4 rounded-lg data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  },
);

export type CookieConsentVariants = VariantProps<typeof cookieConsentVariants>;

@Component({
  selector: 'sc-cookie-consent',
  imports: [FormsModule, ScButton, ScCard, ScSwitch],
  template: `
    <!-- Cookie Consent Banner -->
    @if (showConsent && !showPreferences) {
      <div
        [class]="consentOverlayClass()"
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-description"
        data-state="open"
      >
        <div [class]="consentContentClass()">
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
              <h2 class="text-xl font-semibold tracking-tight" id="cookie-title">
                {{ getTranslation('title') }}
              </h2>
            </div>
            @if (showLanguageSelector()) {
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
                <select
                  class="border-none focus:ring-0 text-sm bg-transparent text-foreground"
                  [(ngModel)]="currentLanguage"
                  (change)="onLanguageChange($event)"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            }
          </div>
          <p class="text-muted-foreground mb-6 leading-relaxed" id="cookie-description">
            {{ getTranslation('description') }}
          </p>
          <div class="flex flex-wrap gap-3 mb-4">
            <button
              [variant]="'primary'"
              [attr.aria-label]="getTranslation('acceptAll')"
              (click)="acceptAll()"
              sc-button
            >
              {{ getTranslation('acceptAll') }}
            </button>
            <button
              [variant]="'secondary'"
              [attr.aria-label]="getTranslation('rejectAll')"
              (click)="rejectAll()"
              sc-button
            >
              {{ getTranslation('rejectAll') }}
            </button>
            <button
              [variant]="'outline'"
              [attr.aria-label]="getTranslation('customize')"
              (click)="openPreferences()"
              sc-button
            >
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
              {{ getTranslation('customize') }}
            </button>
          </div>
          <div class="flex gap-4 text-sm">
            <a
              class="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#"
            >
              {{ getTranslation('privacyPolicy') }}
            </a>
            <a
              class="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="#"
            >
              {{ getTranslation('cookiePolicy') }}
            </a>
          </div>
        </div>
      </div>
    }

    <!-- Cookie Preferences Modal -->
    @if (showPreferences) {
      <div
        [class]="preferencesOverlayClass()"
        role="dialog"
        aria-labelledby="preferences-title"
        data-state="open"
      >
        <div [class]="preferencesContentClass()">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold tracking-tight" id="preferences-title">
              {{ getTranslation('cookiePreferences') }}
            </h2>
            <div class="flex items-center gap-3">
              @if (showLanguageSelector()) {
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
                  <select
                    class="border-none focus:ring-0 text-sm bg-transparent text-foreground"
                    [(ngModel)]="currentLanguage"
                    (change)="onLanguageChange($event)"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              }
              <button
                [variant]="'ghost'"
                [size]="'icon'"
                (click)="closePreferences()"
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
            @for (category of cookieCategories; track category) {
              <div class="p-4" sc-card>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <span class="text-xl">{{ category.icon }}</span>
                    <h3 class="font-semibold">
                      {{ getTranslation(category.key) }}
                    </h3>
                  </div>
                  <input
                    [checked]="cookiePreferences[category.key]"
                    [disabled]="category.key === 'necessary'"
                    [attr.aria-label]="'Toggle ' + getTranslation(category.key)"
                    (checkedChange)="togglePreference(category.key, $event)"
                    sc-switch
                    type="checkbox"
                  />
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ getTranslation(category.key + 'Desc') }}
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
              {{ getTranslation('savePreferences') }}
            </button>
            <button [variant]="'outline'" (click)="closePreferences()" sc-button>
              {{ getTranslation('cancel') }}
            </button>
          </div>
        </div>
      </div>
    }

    <!-- Demo Content (remove in production) -->
    @if (!showConsent) {
      <div class="min-h-screen bg-muted/50 flex items-center justify-center">
        <div class="max-w-2xl mx-auto p-8 text-center">
          <div class="size-16 mx-auto mb-4 text-primary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold mb-4">Cookie Consent Saved</h1>
          <p class="text-muted-foreground mb-6">Cookie preferences have been saved successfully.</p>
          <div class="p-6 mb-6" sc-card>
            <h3 class="font-semibold mb-3">Current Preferences:</h3>
            <div class="space-y-2 text-left">
              @for (pref of getPreferencesArray(); track pref) {
                <div class="flex justify-between items-center">
                  <span class="capitalize">{{ pref.key }}</span>
                  <span
                    class="px-2 py-1 rounded text-sm"
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
          <button [variant]="'primary'" (click)="showConsentBanner()" sc-button>
            Show Cookie Banner Again
          </button>
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCookieConsent implements OnInit {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('relative', this.classInput()));

  readonly showLanguageSelector = input<boolean>(true);
  readonly position = input<CookieConsentVariants['position']>('bottom');

  @Output()
  preferencesChanged = new EventEmitter<CookiePreferences>();

  @Output()
  consentGiven = new EventEmitter<CookiePreferences>();

  showConsent = true;
  showPreferences = false;
  currentLanguage = 'en';

  cookiePreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  };

  // Computed classes using the variants
  readonly consentOverlayClass = computed(() =>
    cn(cookieConsentVariants({ position: this.position() })),
  );

  readonly consentContentClass = computed(() =>
    cn(cookieConsentContentVariants({ position: this.position() })),
  );

  readonly preferencesOverlayClass = computed(() =>
    cn('fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'),
  );

  readonly preferencesContentClass = computed(() =>
    cn(
      'bg-background w-full max-w-2xl rounded-lg border shadow-lg max-h-[90vh] overflow-y-auto p-6',
    ),
  );

  cookieCategories = [
    { key: 'necessary', icon: '🔒' },
    { key: 'analytics', icon: '📊' },
    { key: 'marketing', icon: '🎯' },
    { key: 'functional', icon: '⚙️' },
  ];

  private translations: { [key: string]: { [key: string]: string } } = {
    en: {
      title: 'Cookie Consent',
      description:
        'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      customize: 'Customize',
      savePreferences: 'Save Preferences',
      cookiePreferences: 'Cookie Preferences',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'These cookies are essential for the website to function properly.',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'These cookies help us understand how visitors interact with our website.',
      marketing: 'Marketing Cookies',
      marketingDesc: 'These cookies are used to deliver personalized advertisements.',
      functional: 'Functional Cookies',
      functionalDesc: 'These cookies enable enhanced functionality and personalization.',
      privacyPolicy: 'Privacy Policy',
      cookiePolicy: 'Cookie Policy',
      cancel: 'Cancel',
    },
    es: {
      title: 'Consentimiento de Cookies',
      description:
        'Utilizamos cookies para mejorar su experiencia de navegación, mostrar anuncios o contenido personalizado y analizar nuestro tráfico. Al hacer clic en "Aceptar todo", usted consiente el uso de cookies.',
      acceptAll: 'Aceptar Todo',
      rejectAll: 'Rechazar Todo',
      customize: 'Personalizar',
      savePreferences: 'Guardar Preferencias',
      cookiePreferences: 'Preferencias de Cookies',
      necessary: 'Cookies Necesarias',
      necessaryDesc: 'Estas cookies son esenciales para el funcionamiento del sitio web.',
      analytics: 'Cookies de Análisis',
      analyticsDesc:
        'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.',
      marketing: 'Cookies de Marketing',
      marketingDesc: 'Estas cookies se utilizan para mostrar anuncios personalizados.',
      functional: 'Cookies Funcionales',
      functionalDesc: 'Estas cookies permiten funcionalidades mejoradas y personalización.',
      privacyPolicy: 'Política de Privacidad',
      cookiePolicy: 'Política de Cookies',
      cancel: 'Cancelar',
    },
    fr: {
      title: 'Consentement aux Cookies',
      description:
        'Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des publicités ou du contenu personnalisé et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à notre utilisation des cookies.',
      acceptAll: 'Tout Accepter',
      rejectAll: 'Tout Rejeter',
      customize: 'Personnaliser',
      savePreferences: 'Sauvegarder les Préférences',
      cookiePreferences: 'Préférences des Cookies',
      necessary: 'Cookies Nécessaires',
      necessaryDesc: 'Ces cookies sont essentiels au bon fonctionnement du site web.',
      analytics: "Cookies d'Analyse",
      analyticsDesc:
        'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web.',
      marketing: 'Cookies Marketing',
      marketingDesc: 'Ces cookies sont utilisés pour diffuser des publicités personnalisées.',
      functional: 'Cookies Fonctionnels',
      functionalDesc:
        'Ces cookies permettent des fonctionnalités améliorées et la personnalisation.',
      privacyPolicy: 'Politique de Confidentialité',
      cookiePolicy: 'Politique des Cookies',
      cancel: 'Annuler',
    },
    de: {
      title: 'Cookie-Einverständnis',
      description:
        'Wir verwenden Cookies, um Ihr Browsing-Erlebnis zu verbessern, personalisierte Werbung oder Inhalte zu zeigen und unseren Traffic zu analysieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung von Cookies zu.',
      acceptAll: 'Alle Akzeptieren',
      rejectAll: 'Alle Ablehnen',
      customize: 'Anpassen',
      savePreferences: 'Einstellungen Speichern',
      cookiePreferences: 'Cookie-Einstellungen',
      necessary: 'Notwendige Cookies',
      necessaryDesc:
        'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich.',
      analytics: 'Analyse-Cookies',
      analyticsDesc:
        'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.',
      marketing: 'Marketing-Cookies',
      marketingDesc: 'Diese Cookies werden verwendet, um personalisierte Werbung zu liefern.',
      functional: 'Funktionale Cookies',
      functionalDesc: 'Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung.',
      privacyPolicy: 'Datenschutzrichtlinie',
      cookiePolicy: 'Cookie-Richtlinie',
      cancel: 'Abbrechen',
    },
  };

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.currentLanguage = this.locale.split('-')[0] || 'en';
  }

  ngOnInit() {
    // Load saved preferences from localStorage
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      this.cookiePreferences = JSON.parse(saved);
      this.showConsent = false;
    }
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || this.translations['en'][key] || key;
  }

  onLanguageChange(event: any) {
    this.currentLanguage = event.target.value;
  }

  acceptAll() {
    this.cookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    this.saveAndClose();
  }

  rejectAll() {
    this.cookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    this.saveAndClose();
  }

  openPreferences() {
    this.showPreferences = true;
  }

  closePreferences() {
    this.showPreferences = false;
  }

  togglePreference(type: keyof CookiePreferences, checked: boolean) {
    if (type === 'necessary') return; // Can't disable necessary cookies

    this.cookiePreferences = {
      ...this.cookiePreferences,
      [type]: checked,
    };
  }

  savePreferences() {
    this.saveAndClose();
  }

  private saveAndClose() {
    // Save to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(this.cookiePreferences));

    // Emit events
    this.preferencesChanged.emit(this.cookiePreferences);
    this.consentGiven.emit(this.cookiePreferences);

    // Close modals
    this.showPreferences = false;
    this.showConsent = false;
  }

  showConsentBanner() {
    this.showConsent = true;
  }

  getPreferencesArray() {
    return Object.entries(this.cookiePreferences).map(([key, enabled]) => ({
      key,
      enabled,
    }));
  }
}
