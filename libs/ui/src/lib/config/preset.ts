import { inject } from '@angular/core';
import type { ScPresetStyles } from '@semantic-components/preset-styles';
import { nova } from '@semantic-components/preset-styles/nova';
import { SC_CONFIG } from './config';

/**
 * The app's preset (`provideScConfig({ preset })`), nova by default: the
 * classes of the parts that follow it. In an injection context, e.g. a field:
 * `private readonly buttonStyles = injectPreset().button;`
 */
export function injectPreset(): ScPresetStyles {
  return inject(SC_CONFIG).preset ?? nova;
}
