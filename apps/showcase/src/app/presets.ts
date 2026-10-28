import type { ScPreset, ScPresetName } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { readCookie, writeCookie } from '@semantic-components/ui';

/**
 * Every preset, for the showcase's preset sheet. An app with one preset
 * imports only its own; the showcase shows them all.
 */
export const PRESETS: Record<ScPresetName, ScPreset> = {
  nova,
  vega,
  maia,
  lyra,
  mira,
  luma,
  sera,
  rhea,
};

const KEY = 'sc-preset';

/**
 * The preset chosen in the sheet, read when the app starts (a preset is set
 * once): its cookie, nova without one (or on the server).
 */
export function storedPreset(): ScPresetName {
  const name = readCookie(KEY);
  return name && name in PRESETS ? (name as ScPresetName) : 'nova';
}

/** Saves the preset for the next start. */
export function storePreset(name: ScPresetName): void {
  writeCookie(KEY, name);
}
