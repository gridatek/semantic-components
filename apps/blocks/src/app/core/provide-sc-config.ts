import { Provider } from '@angular/core';
import { SC_I18N_CONFIG, ScI18nConfig } from './locale';

export interface ScConfig {
  i18n?: ScI18nConfig;
}

export function provideScConfig(config: ScConfig): Provider[] {
  const providers: Provider[] = [];

  if (config.i18n) {
    providers.push({ provide: SC_I18N_CONFIG, useValue: config.i18n });
  }

  return providers;
}
