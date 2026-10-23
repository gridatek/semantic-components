import {
  type EnvironmentProviders,
  InjectionToken,
  type Provider,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import type { ScPresetStyles } from '@semantic-components/preset-styles';
import type { ScToasterConfig } from '../components/toast/toast.types';

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
  /** The components' classes: a preset from preset-styles; nova by default. */
  preset?: ScPresetStyles;
  toaster?: ScToasterConfig;
}

export const SC_CONFIG = new InjectionToken<ScConfig>('SC_CONFIG', {
  factory: () => ({}),
});

/**
 * Sets the libraries' settings — each part falls back to its component's
 * defaults. Given again lower down (a lazy route), its parts merge into those
 * above.
 */
export function provideScConfig(config: ScConfig): EnvironmentProviders {
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
  return makeEnvironmentProviders([provider]);
}
