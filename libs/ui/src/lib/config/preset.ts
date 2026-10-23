import { inject } from '@angular/core';
import type { ScPreset } from '@semantic-components/presets';
import { nova } from '@semantic-components/presets/nova';
import { SC_CONFIG } from './config';

/**
 * The app's preset (`provideScConfig({ preset })`), nova by default: the
 * classes of the parts that follow it. In an injection context, e.g. a field:
 * `private readonly buttonStyles = injectPreset().button;`
 */
export function injectPreset(): ScPreset {
  return inject(SC_CONFIG).preset ?? nova;
}
