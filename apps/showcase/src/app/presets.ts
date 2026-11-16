import {
  DOCUMENT,
  type EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
} from '@angular/core';
import type { ScPreset, ScPresetName } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { ScStorage, writeStorage } from '@semantic-components/ui';

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
 * The preset chosen on /presets, from `ScStorage`: its cookie in the browser
 * and, on the server, the request's — so a server-rendered page is drawn in it
 * (the browser can't change the classes hydration keeps). Lyra without one:
 * the showcase opens in lyra, not in shadcn's default look (nova).
 */
export function presetFrom(storage: ScStorage): ScPresetName {
  const name = storage.get(KEY);
  return name && name in PRESETS ? (name as ScPresetName) : 'lyra';
}

/** Saves the preset for the next start. */
export function storePreset(name: ScPresetName): void {
  writeStorage(KEY, name);
}

/** The preset's stylesheets: Typeset's variables, the editor's rules and variables. */
const PRESET_STYLES = ['typeset-variables', 'editor', 'editor-variables'];

/**
 * The preset's stylesheets (its typeset-variables.css, editor.css and
 * editor-variables.css), each a stylesheet of its own — the `<file>-<name>`
 * bundles in project.json, not injected — linked in the head at start: on the
 * server too, from the request's cookie, so the page is drawn with them. An
 * app with one preset imports its files instead.
 */
export function providePresetStyles(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const document = inject(DOCUMENT);
    const name = presetFrom(inject(ScStorage));
    for (const file of PRESET_STYLES) {
      let link = document.head.querySelector(`link#${file}`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('id', file);
        link.setAttribute('rel', 'stylesheet');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${file}-${name}.css`);
    }
  });
}
