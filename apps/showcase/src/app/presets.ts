import type { ScPreset, ScPresetName } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import {
  type ScStorage,
  readStorage,
  writeStorage,
} from '@semantic-components/ui';

/**
 * Every preset, for the showcase's /presets page. An app with one preset
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
 * once): its cookie, lyra without one (or on the server) — the showcase
 * opens in lyra, not in shadcn's default look (nova).
 */
export function storedPreset(): ScPresetName {
  const name = readStorage(KEY);
  return name && name in PRESETS ? (name as ScPresetName) : 'lyra';
}

/**
 * The preset chosen, from `ScStorage`: its cookie in the browser and, on the
 * server, the request's — so a server-rendered page is drawn in it (the
 * browser can't change the classes hydration keeps). Lyra without one.
 */
export function presetFrom(storage: ScStorage): ScPresetName {
  const name = storage.get(KEY);
  return name && name in PRESETS ? (name as ScPresetName) : 'lyra';
}

/** Saves the preset for the next start. */
export function storePreset(name: ScPresetName): void {
  writeStorage(KEY, name);
}
