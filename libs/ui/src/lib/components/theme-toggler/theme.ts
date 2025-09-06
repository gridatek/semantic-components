import { DOCUMENT, Injectable, afterNextRender, computed, inject, signal } from '@angular/core';

import { ScLocalStorageService, ScWindowService } from '@semantic-components/utils';

@Injectable({
  providedIn: 'root',
})
export class ScTheme {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly localStorage = inject(ScLocalStorageService);
  private readonly windowService = inject(ScWindowService);

  private readonly isDarkModeSignal = signal<boolean>(false);

  readonly isDarkMode = computed(() => this.isDarkModeSignal());

  readonly theme = computed<'light' | 'dark'>(() => {
    return this.isDarkMode() ? 'dark' : 'light';
  });

  constructor() {
    afterNextRender(() => {
      // Initialize theme from localStorage or system preference
      this.initializeTheme();
    });
  }

  private initializeTheme(): void {
    // Check if user has a saved preference
    const savedTheme = this.localStorage.getItem<'light' | 'dark'>('theme');

    if (savedTheme) {
      this.isDarkModeSignal.set(savedTheme === 'dark');
    } else {
      // If no saved preference, check system preference
      const mediaQuery = this.windowService.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery) {
        this.isDarkModeSignal.set(mediaQuery.matches);
      }
    }

    // Apply the theme
    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(): void {
    this.isDarkModeSignal.update((t) => !t);
    this.applyTheme(this.isDarkMode());
    this.localStorage.setItem('theme', this.theme());
  }

  private applyTheme(isDark: boolean): void {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    this.document.documentElement.classList.toggle('dark', isDark);
  }
}
