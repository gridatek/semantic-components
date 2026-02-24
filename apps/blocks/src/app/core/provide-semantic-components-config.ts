import { Provider } from '@angular/core';
import { SC_LOCALE_CONFIG, ScLocaleConfig } from './locale';

export interface ScConfig {
  locale?: ScLocaleConfig;
}

export function provideScConfig(config: ScConfig): Provider[] {
  const providers: Provider[] = [];

  if (config.locale) {
    providers.push({ provide: SC_LOCALE_CONFIG, useValue: config.locale });
  }

  return providers;
}
