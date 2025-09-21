import { Dialog } from '@angular/cdk/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Injectable, TemplateRef, computed, inject, signal } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  [key: string]: boolean;
}

export interface CookieConsentOptions {
  showLanguageSelector?: boolean;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
  autoShow?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly dialog = inject(Dialog);
  private readonly scrollStrategies = inject(ScrollStrategyOptions);

  private preferencesSubject = new BehaviorSubject<CookiePreferences | null>(null);
  public preferences$: Observable<CookiePreferences | null> =
    this.preferencesSubject.asObservable();

  // Dialog state management
  readonly isConsentDialogOpen = signal(false);
  readonly isPreferencesDialogOpen = signal(false);
  readonly currentLanguage = signal('en');

  // Cookie categories for preferences
  readonly cookieCategories = [
    { key: 'necessary', icon: '🔒' },
    { key: 'analytics', icon: '📊' },
    { key: 'marketing', icon: '🎯' },
    { key: 'functional', icon: '⚙️' },
  ];

  // Translations
  private readonly translations: { [key: string]: { [key: string]: string } } = {
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

  constructor() {
    this.loadPreferences();
  }

  private loadPreferences() {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      this.preferencesSubject.next(JSON.parse(saved));
    }
  }

  setPreferences(preferences: CookiePreferences) {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    this.preferencesSubject.next(preferences);
  }

  getPreferences(): CookiePreferences | null {
    return this.preferencesSubject.value;
  }

  hasConsent(type: keyof CookiePreferences): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs[type] : false;
  }

  clearPreferences() {
    localStorage.removeItem('cookiePreferences');
    this.preferencesSubject.next(null);
  }

  // Dialog methods
  showConsentDialog(templateRef: TemplateRef<unknown>, options?: CookieConsentOptions) {
    if (this.isConsentDialogOpen()) return;

    const position = options?.position || 'bottom-center';

    const dialogRef = this.dialog.open(templateRef, {
      hasBackdrop: false,
      disableClose: true,
      panelClass: ['cookie-consent-dialog', `cookie-consent-${position}`],
      scrollStrategy: this.scrollStrategies.noop(),
      data: { options },
    });

    this.isConsentDialogOpen.set(true);

    dialogRef.closed.subscribe(() => {
      this.isConsentDialogOpen.set(false);
    });

    return dialogRef;
  }

  showPreferencesDialog(templateRef: TemplateRef<unknown>) {
    if (this.isPreferencesDialogOpen()) return;

    const dialogRef = this.dialog.open(templateRef, {
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'cookie-preferences-dialog',
    });

    this.isPreferencesDialogOpen.set(true);

    dialogRef.closed.subscribe(() => {
      this.isPreferencesDialogOpen.set(false);
    });

    return dialogRef;
  }

  closeAllDialogs() {
    this.dialog.closeAll();
    this.isConsentDialogOpen.set(false);
    this.isPreferencesDialogOpen.set(false);
  }

  // Auto-show consent if no preferences saved
  checkAndShowConsent(templateRef: TemplateRef<unknown>, options?: CookieConsentOptions) {
    if (!this.getPreferences() && options?.autoShow !== false) {
      this.showConsentDialog(templateRef, options);
    }
  }

  // Translation helper
  getTranslation(key: string): string {
    return this.translations[this.currentLanguage()]?.[key] || this.translations['en'][key] || key;
  }

  // Language management
  setLanguage(language: string) {
    this.currentLanguage.set(language);
  }

  // Preference actions
  acceptAllCookies() {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    this.setPreferences(preferences);
    this.closeAllDialogs();
  }

  rejectAllCookies() {
    const preferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    this.setPreferences(preferences);
    this.closeAllDialogs();
  }

  saveCustomPreferences(preferences: CookiePreferences) {
    this.setPreferences(preferences);
    this.closeAllDialogs();
  }

  // Utility to get preferences as array for display
  getPreferencesArray(): Array<{ key: string; enabled: boolean }> {
    const prefs = this.getPreferences();
    if (!prefs) return [];

    return Object.entries(prefs).map(([key, enabled]) => ({
      key,
      enabled,
    }));
  }

  // Check if consent dialog should be shown
  shouldShowConsent(): boolean {
    return !this.getPreferences();
  }
}
