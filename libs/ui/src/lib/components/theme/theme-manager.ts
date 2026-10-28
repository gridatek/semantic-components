import { DOCUMENT } from '@angular/common';
import {
  InjectionToken,
  Service,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ScStorage } from '../../utilities/storage/storage';

export type ScThemeMode = 'light' | 'dark' | 'system';

export interface ScThemeConfig {
  defaultMode: ScThemeMode;
  defaultColorScheme: string;
  /** Where the mode is kept (a cookie, copied to `localStorage`). */
  modeStorageKey: string;
  /** Where the color scheme is kept. */
  colorSchemeStorageKey: string;
}

const defaultConfig: ScThemeConfig = {
  defaultMode: 'system',
  defaultColorScheme: 'default',
  modeStorageKey: 'sc-theme-mode',
  colorSchemeStorageKey: 'sc-theme-color',
};

export const SC_THEME_CONFIG = new InjectionToken<Partial<ScThemeConfig>>(
  'SC_THEME_CONFIG',
);

@Service()
export class ScThemeManager {
  private readonly config = {
    ...defaultConfig,
    ...inject(SC_THEME_CONFIG, { optional: true }),
  };

  private readonly storage = inject(ScStorage);
  private readonly document = inject(DOCUMENT);

  // None on the server: there, "system" is light.
  private readonly darkMediaQuery =
    this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)') ??
    null;

  readonly mode = signal<ScThemeMode>(
    this.getStored(
      this.config.modeStorageKey,
      this.config.defaultMode,
      this.isValidMode,
    ),
  );

  readonly colorScheme = signal<string>(
    this.getStored(
      this.config.colorSchemeStorageKey,
      this.config.defaultColorScheme,
    ),
  );

  // A signal so `resolvedMode` re-evaluates when the OS theme changes.
  private readonly systemMode = signal(this.getSystemMode());

  readonly resolvedMode = computed(() => {
    const mode = this.mode();
    if (mode === 'system') {
      return this.systemMode();
    }
    return mode;
  });

  readonly isDark = computed(() => this.resolvedMode() === 'dark');
  readonly isLight = computed(() => this.resolvedMode() === 'light');

  constructor() {
    effect(() => {
      this.applyMode(this.resolvedMode());
    });

    effect(() => {
      this.applyColorScheme(this.colorScheme());
    });

    this.darkMediaQuery?.addEventListener('change', () => {
      this.systemMode.set(this.getSystemMode());
    });
  }

  setMode(mode: ScThemeMode): void {
    this.mode.set(mode);
    this.store(this.config.modeStorageKey, mode);
  }

  toggleMode(): void {
    const current = this.resolvedMode();
    this.setMode(current === 'dark' ? 'light' : 'dark');
  }

  setColorScheme(colorScheme: string): void {
    this.colorScheme.set(colorScheme);
    this.store(this.config.colorSchemeStorageKey, colorScheme);
  }

  private isValidMode(value: string): value is ScThemeMode {
    return value === 'light' || value === 'dark' || value === 'system';
  }

  private getStored<T extends string>(
    key: string,
    fallback: T,
    validate?: (value: string) => value is T,
  ): T {
    const stored = this.storage.get(key);
    if (stored && (!validate || validate(stored))) {
      return stored as T;
    }
    return fallback;
  }

  private store(key: string, value: string): void {
    this.storage.set(key, value);
  }

  private getSystemMode(): 'light' | 'dark' {
    return this.darkMediaQuery?.matches ? 'dark' : 'light';
  }

  private applyMode(mode: 'light' | 'dark'): void {
    const root = this.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  private applyColorScheme(colorScheme: string): void {
    const root = this.document.documentElement;
    if (colorScheme === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', colorScheme);
    }
  }
}
