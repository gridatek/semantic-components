import { InjectionToken } from '@angular/core';

export interface ScLocale {
  code: string;
  label: string;
  nativeLabel: string;
  direction: 'ltr' | 'rtl';
}

export interface ScLocaleConfig {
  supportedLocales: ScLocale[];
  defaultLocaleCode: string;
  storageKey?: string;
}

export const SC_LOCALE_CONFIG = new InjectionToken<ScLocaleConfig>(
  'SC_LOCALE_CONFIG',
);
