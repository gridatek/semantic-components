import {
  DOCUMENT,
  type EnvironmentProviders,
  inject,
  provideEnvironmentInitializer,
} from '@angular/core';
import type { ScStyle, ScStyleName } from '@semantic-components/styles';
import { luma } from '@semantic-components/styles/luma';
import { lyra } from '@semantic-components/styles/lyra';
import { maia } from '@semantic-components/styles/maia';
import { mira } from '@semantic-components/styles/mira';
import { nova } from '@semantic-components/styles/nova';
import { rhea } from '@semantic-components/styles/rhea';
import { sera } from '@semantic-components/styles/sera';
import { vega } from '@semantic-components/styles/vega';
import { ScStorage, writeStorage } from '@semantic-components/ui';

/**
 * Every style, for the showcase's /customize page. An app with one style
 * imports only its own; the showcase shows them all.
 */
export const STYLES: Record<ScStyleName, ScStyle> = {
  nova,
  vega,
  maia,
  lyra,
  mira,
  luma,
  sera,
  rhea,
};

const KEY = 'sc-style';

/**
 * The style chosen on /customize, from `ScStorage`: its cookie in the browser
 * and, on the server, the request's — so a server-rendered page is drawn in it
 * (the browser can't change the classes hydration keeps). Lyra without one:
 * the showcase opens in lyra, not in shadcn's default look (nova).
 */
export function styleFrom(storage: ScStorage): ScStyleName {
  const name = storage.get(KEY);
  return name && name in STYLES ? (name as ScStyleName) : 'lyra';
}

/** Saves the style for the next start. */
export function storeStyle(name: ScStyleName): void {
  writeStorage(KEY, name);
}

/** The style's stylesheets: Typeset's variables, the editor's rules, the scrollbars' variables. */
const STYLE_SHEETS = ['typeset-variables', 'editor', 'scrollbar-variables'];

/**
 * The style's stylesheets (its typeset-variables.css, editor.css and
 * scrollbar-variables.css), each
 * a stylesheet of its own — the `<file>-<name>`
 * bundles in project.json, not injected — linked in the head at start: on the
 * server too, from the request's cookie, so the page is drawn with them. An
 * app with one style imports its files instead.
 */
export function provideStyleSheets(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const document = inject(DOCUMENT);
    const name = styleFrom(inject(ScStorage));
    for (const file of STYLE_SHEETS) {
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
