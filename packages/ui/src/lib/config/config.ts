import {
  type EnvironmentProviders,
  InjectionToken,
  type Provider,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import type { ScStyle } from '@semantic-components/styles';
import type { ScMode } from '../components/preset/preset-manager';
import type { ScToasterConfig } from '../components/toast/toast-types';

/**
 * The libraries' settings, a part for each component. Another library adds
 * its own part with module augmentation:
 *
 * ```ts
 * declare module '@semantic-components/ui' {
 *   interface ScConfig {
 *     editor?: ScEditorConfig;
 *   }
 * }
 * ```
 */
export interface ScConfig {
  /** How the app looks: its style, its theme and its mode. */
  preset?: ScPreset;
  toaster?: ScToasterConfig;
  /**
   * The names the user's choices are kept under (cookies, copied to
   * `localStorage`), each `sc-…` by default. Two apps on one host share
   * cookies whatever their port: give each its own names. The language's
   * is i18n's `storageKey` (read before the app), the sidebar's its
   * `storageKey` input.
   */
  storageKeys?: ScStorageKeys;
}

/** The library's saved choices, by name: each left out keeps its `sc-…` name. */
export interface ScStorageKeys {
  /** Light, dark or system (`ScPresetManager`): `sc-mode`. */
  readonly mode?: string;
  /** The theme (`ScPresetManager`): `sc-theme`. */
  readonly theme?: string;
  /** The digits (`injectNumberingSystem()`): `sc-numbering-system`. */
  readonly numberingSystem?: string;
  /** The week's first day (`injectFirstDayOfWeek()`): `sc-first-day-of-week`. */
  readonly firstDayOfWeek?: string;
  /** The clock (`injectHourCycle()`): `sc-hour-cycle`. */
  readonly hourCycle?: string;
}

/**
 * How the app looks, three things: the style (how the parts are drawn), the
 * theme (every CSS variable shadcn gives: colours, radius, fonts…) and the mode
 * (light or dark).
 */
export interface ScPreset {
  /** The parts' classes: a style from `@semantic-components/styles`; nova by default. Fixed when the app starts. */
  style?: ScStyle;
  /** shadcn's CSS variables, under a name: `[data-theme]` on the page's root (`'default'`, the default, sets none). The user's choice, kept, comes first: `ScPresetManager`. */
  theme?: string;
  /** Light, dark or the system's (the default). The user's choice, kept, comes first: `ScPresetManager`. */
  mode?: ScMode;
}

export const SC_CONFIG = new InjectionToken<ScConfig>('SC_CONFIG', {
  factory: () => ({}),
});

/**
 * A feature of the libraries, from one of their entries — `withI18n()`,
 * `withCodeHighlighter()`: its providers, given with the settings.
 */
export interface ScFeature<Kind extends string = string> {
  readonly kind: Kind;
  readonly providers: readonly (Provider | EnvironmentProviders)[];
}

/** A feature, for an entry to export as `with…()`. */
export function makeScFeature<Kind extends string>(
  kind: Kind,
  providers: readonly (Provider | EnvironmentProviders)[],
): ScFeature<Kind> {
  return { kind, providers };
}

/**
 * Sets up the libraries: their settings — each part falls back to its
 * component's defaults — and the features of their entries:
 * `provideSemanticComponents({ preset: { style: nova } }, withCodeHighlighter())`.
 * Given again lower down (a lazy route), its parts merge into those above.
 */
export function provideSemanticComponents(
  config: ScConfig = {},
  ...features: ScFeature[]
): EnvironmentProviders {
  const provider: Provider = {
    provide: SC_CONFIG,
    useFactory: (): ScConfig => {
      const parent = inject(SC_CONFIG, { skipSelf: true, optional: true });
      const merged: Record<string, unknown> = { ...parent };
      for (const [key, part] of Object.entries(config)) {
        merged[key] =
          typeof part === 'object'
            ? { ...(merged[key] as object | undefined), ...part }
            : part;
      }
      return merged as ScConfig;
    },
  };
  return makeEnvironmentProviders([
    provider,
    ...features.flatMap((feature) => feature.providers),
  ]);
}
