import { InjectionToken } from '@angular/core';

export interface ScLocale {
  code: string;
  label: string;
  nativeLabel: string;
  direction: 'ltr' | 'rtl';
}

export interface ScI18nConfig {
  supportedLocales: ScLocale[];
  defaultLocaleCode: string;
  storageKey?: string;
}

export const SC_I18N_CONFIG = new InjectionToken<ScI18nConfig>(
  'SC_I18N_CONFIG',
);
