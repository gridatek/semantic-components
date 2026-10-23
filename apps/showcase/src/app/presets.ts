import type {
  ScPresetName,
  ScPresetStyles,
} from '@semantic-components/preset-styles';
import { luma } from '@semantic-components/preset-styles/luma';
import { lyra } from '@semantic-components/preset-styles/lyra';
import { maia } from '@semantic-components/preset-styles/maia';
import { mira } from '@semantic-components/preset-styles/mira';
import { nova } from '@semantic-components/preset-styles/nova';
import { rhea } from '@semantic-components/preset-styles/rhea';
import { sera } from '@semantic-components/preset-styles/sera';
import { vega } from '@semantic-components/preset-styles/vega';

/**
 * Every preset, for the showcase's preset sheet. An app with one preset
 * imports only its own; the showcase shows them all.
 */
export const PRESETS: Record<ScPresetName, ScPresetStyles> = {
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
 * once): saved in localStorage, nova without one (or on the server).
 */
export function storedPreset(): ScPresetName {
  try {
    const name = globalThis.localStorage?.getItem(KEY);
    return name && name in PRESETS ? (name as ScPresetName) : 'nova';
  } catch {
    return 'nova';
  }
}

/** Saves the preset for the next start. */
export function storePreset(name: ScPresetName): void {
  try {
    globalThis.localStorage?.setItem(KEY, name);
  } catch {
    // localStorage unavailable: the choice lasts until the reload.
  }
}
