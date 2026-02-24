import { Provider } from '@angular/core';
import { SC_LOCALE_CONFIG, ScLocaleConfig } from './locale';

export interface ScConfig {
  i18n?: ScLocaleConfig;
}

export function provideScConfig(config: ScConfig): Provider[] {
  const providers: Provider[] = [];

  if (config.i18n) {
    providers.push({ provide: SC_LOCALE_CONFIG, useValue: config.i18n });
  }

  return providers;
}
