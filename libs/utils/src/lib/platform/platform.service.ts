import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private _platform = signal<string | undefined>(undefined);

  constructor() {
    if (typeof navigator !== 'undefined') {
      this._platform.set(navigator.platform);
    }
  }

  /**
   * Returns true if the current platform is macOS
   */
  readonly isMac = computed(() => {
    if (typeof navigator !== 'undefined') {
      return (
        navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
        navigator.userAgent.toUpperCase().indexOf('MAC') >= 0
      );
    }
    return false;
  });

  /**
   * Returns true if the current platform is Windows
   */
  readonly isWindows = computed(() => {
    if (typeof navigator !== 'undefined') {
      return (
        navigator.platform.toUpperCase().indexOf('WIN') >= 0 ||
        navigator.userAgent.toUpperCase().indexOf('WIN') >= 0
      );
    }
    return false;
  });

  /**
   * Returns true if the current platform is Linux
   */
  readonly isLinux = computed(() => {
    if (typeof navigator !== 'undefined') {
      return (
        navigator.platform.toUpperCase().indexOf('LINUX') >= 0 ||
        navigator.userAgent.toUpperCase().indexOf('LINUX') >= 0
      );
    }
    return false;
  });

  /**
   * Returns the appropriate modifier key symbol for the current platform
   */
  readonly modifierKey = computed(() => {
    return this.isMac() ? '⌘' : 'Ctrl';
  });

  /**
   * Returns the platform name as a string
   */
  readonly platformName = computed(() => {
    if (this.isMac()) return 'macOS';
    if (this.isWindows()) return 'Windows';
    if (this.isLinux()) return 'Linux';
    return 'Unknown';
  });

  /**
   * Formats a keyboard shortcut for the current platform
   * @param key The key (e.g., 'K', 'P')
   * @param requiresShift Whether Shift is required
   * @returns Formatted shortcut string (e.g., '⌘K', 'Ctrl+Shift+P')
   */
  formatShortcut(key: string, requiresShift = false): string {
    const modifier = this.modifierKey();
    const shift = requiresShift ? '+Shift' : '';
    return `${modifier}${shift}+${key.toUpperCase()}`;
  }
}
