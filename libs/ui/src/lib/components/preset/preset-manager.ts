import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  CSP_NONCE,
  PLATFORM_ID,
  Service,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SC_CONFIG } from '../../config/config';
import { ScStorage } from '../../utils/storage/storage';
import { themeScript } from './theme-script';

export type ScMode = 'light' | 'dark' | 'system';

/** Where the user's choices are kept (a cookie, copied to `localStorage`). */
const MODE_KEY = 'sc-mode';
const THEME_KEY = 'sc-theme';

/**
 * The theme and the mode, while the app runs: the user's choices, kept (a
 * cookie the server reads too), else the preset's (`provideSemanticComponents({ preset: { theme, mode } })`).
 * The mode puts `dark` on the page's root, and sets its `color-scheme`
 * (see `applyMode`); the theme, `data-theme`. On the server, a script at
 * the top of `<head>` does it again before the first paint: "system" from
 * the browser's `prefers-color-scheme`, and the user's choices on a
 * prerendered page (no request, no cookie).
 */
@Service()
export class ScPresetManager {
  private readonly preset = inject(SC_CONFIG).preset;

  private readonly storage = inject(ScStorage);
  private readonly document = inject(DOCUMENT);

  // None on the server: there, "system" is light.
  private readonly darkMediaQuery =
    this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)') ??
    null;

  readonly mode = signal<ScMode>(
    this.getStored(MODE_KEY, this.preset?.mode ?? 'system', this.isValidMode),
  );

  /** shadcn's CSS variables, by name: `'default'`, or the name your CSS gives `[data-theme]`. */
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

    if (isPlatformServer(inject(PLATFORM_ID))) this.addScript();
  }

  setMode(mode: ScMode): void {
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

  private isValidMode(value: string): value is ScMode {
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

  /** The script that sets the mode and the theme before the first paint (`themeScript`); once, at the top of `<head>`. */
  private addScript(): void {
    const head = this.document.head;
    if (!head || head.querySelector('script#sc-theme-script')) return;
    const script = this.document.createElement('script');
    script.id = 'sc-theme-script';
    const nonce = inject(CSP_NONCE, { optional: true });
    if (nonce) script.setAttribute('nonce', nonce);
    script.textContent = themeScript({
      modeKey: MODE_KEY,
      themeKey: THEME_KEY,
      mode: this.preset?.mode ?? 'system',
      theme: this.preset?.theme ?? 'default',
    });
    // After the charset, which must stay in the first 1024 bytes.
    const charset = head.querySelector('meta[charset]');
    head.insertBefore(script, charset ? charset.nextSibling : head.firstChild);
  }

  private getSystemMode(): 'light' | 'dark' {
    return this.darkMediaQuery?.matches ? 'dark' : 'light';
  }

  /**
   * The mode shown, on the page's root: the `dark` class (the theme's dark
   * values), and `color-scheme` — `light` or `dark`, never both.
   *
   * `color-scheme` tells the browser which mode the page is in: its own
   * parts follow it (scrollbars, native form controls, the default canvas
   * and text colours), and so does every `light-dark()` in the page's CSS.
   * Without it, they follow the operating system, not the mode chosen here:
   * a site switched to light on a system in dark would show dark scrollbars
   * and native controls.
   *
   * It's set inline, on `<html>`: an inline style wins over any stylesheet
   * rule, whatever its order. A stylesheet you import can't override it —
   * pdf.js's `pdf_viewer.css` sets `:root { color-scheme: light dark }`
   * for the whole page (pdf.js issue 19886), which would otherwise hand
   * these back to the system.
   */
  private applyMode(mode: 'light' | 'dark'): void {
    const root = this.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.style.colorScheme = mode;
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
