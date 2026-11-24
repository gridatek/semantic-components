import { DOCUMENT } from '@angular/common';
import { Service, computed, effect, inject, signal } from '@angular/core';
import { SC_CONFIG } from '../../config/config';
import { ScStorage } from '../../utils/storage/storage';

export type ScThemeMode = 'light' | 'dark' | 'system';

/** Where the user's choices are kept (a cookie, copied to `localStorage`). */
const MODE_KEY = 'sc-mode';
const THEME_KEY = 'sc-theme';

/**
 * The theme and the mode, while the app runs: the user's choices, kept (a
 * cookie the server reads too), else the preset's (`provideSemanticComponents({ preset: { theme, mode } })`).
 * The mode puts `dark` on the page's root; the theme, `data-theme`.
 */
@Service()
export class ScThemeManager {
  private readonly preset = inject(SC_CONFIG).preset;

  private readonly storage = inject(ScStorage);
  private readonly document = inject(DOCUMENT);

  // None on the server: there, "system" is light.
  private readonly darkMediaQuery =
    this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)') ??
    null;

  readonly mode = signal<ScThemeMode>(
    this.getStored(MODE_KEY, this.preset?.mode ?? 'system', this.isValidMode),
  );

  /** The colours: `'default'`, or the name your CSS gives `[data-theme]`. */
  readonly theme = signal<string>(
    this.getStored(THEME_KEY, this.preset?.theme ?? 'default'),
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
      this.applyTheme(this.theme());
    });

    this.darkMediaQuery?.addEventListener('change', () => {
      this.systemMode.set(this.getSystemMode());
    });
  }

  setMode(mode: ScThemeMode): void {
    this.mode.set(mode);
    this.store(MODE_KEY, mode);
  }

  toggleMode(): void {
    const current = this.resolvedMode();
    this.setMode(current === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: string): void {
    this.theme.set(theme);
    this.store(THEME_KEY, theme);
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

  private applyTheme(theme: string): void {
    const root = this.document.documentElement;
    if (theme === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }
}
