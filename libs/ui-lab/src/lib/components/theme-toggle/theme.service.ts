import { computed, effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ScTheme {
  private readonly storageKey = 'sc-theme';
  private readonly darkMediaQuery =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  readonly theme = signal<Theme>(this.getStoredTheme());

  readonly resolvedTheme = computed(() => {
    const theme = this.theme();
    if (theme === 'system') {
      return this.getSystemTheme();
    }
    return theme;
  });

  readonly isDark = computed(() => this.resolvedTheme() === 'dark');

  constructor() {
    effect(() => {
      const resolved = this.resolvedTheme();
      this.applyTheme(resolved);
    });

    this.darkMediaQuery?.addEventListener('change', () => {
      if (this.theme() === 'system') {
        this.applyTheme(this.getSystemTheme());
      }
    });
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.storeTheme(theme);
  }

  toggleTheme(): void {
    const current = this.resolvedTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  private getStoredTheme(): Theme {
    if (typeof localStorage === 'undefined') {
      return 'system';
    }
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  }

  private storeTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  private getSystemTheme(): 'light' | 'dark' {
    return this.darkMediaQuery?.matches ? 'dark' : 'light';
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    if (typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
