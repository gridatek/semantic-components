import { Injectable, afterNextRender, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScWindowService {
  private _isAvailable = signal<boolean>(false);
  private _window = signal<Window | null>(null);

  constructor() {
    // Initialize after render to ensure we're in browser environment
    afterNextRender(() => {
      this.initialize();
    });
  }

  /**
   * Returns true if window is available (browser environment)
   */
  readonly isAvailable = computed(() => this._isAvailable());

  /**
   * Returns the window object or null if not available
   */
  readonly window = computed(() => this._window());

  /**
   * Initialize the window service
   */
  private initialize(): void {
    if (typeof window !== 'undefined') {
      this._window.set(window);
      this._isAvailable.set(true);
    }
  }

  /**
   * Gets the current window location
   * @returns Location object or null if not available
   */
  getLocation(): Location | null {
    return this.window()?.location ?? null;
  }

  /**
   * Gets the current window navigator
   * @returns Navigator object or null if not available
   */
  getNavigator(): Navigator | null {
    return this.window()?.navigator ?? null;
  }

  /**
   * Gets the current window document
   * @returns Document object or null if not available
   */
  getDocument(): Document | null {
    return this.window()?.document ?? null;
  }

  /**
   * Gets the current window history
   * @returns History object or null if not available
   */
  getHistory(): History | null {
    return this.window()?.history ?? null;
  }

  /**
   * Gets the window's inner width
   * @returns Inner width or 0 if not available
   */
  getInnerWidth(): number {
    return this.window()?.innerWidth ?? 0;
  }

  /**
   * Gets the window's inner height
   * @returns Inner height or 0 if not available
   */
  getInnerHeight(): number {
    return this.window()?.innerHeight ?? 0;
  }

  /**
   * Gets the window's outer width
   * @returns Outer width or 0 if not available
   */
  getOuterWidth(): number {
    return this.window()?.outerWidth ?? 0;
  }

  /**
   * Gets the window's outer height
   * @returns Outer height or 0 if not available
   */
  getOuterHeight(): number {
    return this.window()?.outerHeight ?? 0;
  }

  /**
   * Gets the window's scroll position
   * @returns Object with x and y scroll positions
   */
  getScrollPosition(): { x: number; y: number } {
    const win = this.window();
    return {
      x: win?.scrollX ?? 0,
      y: win?.scrollY ?? 0,
    };
  }

  /**
   * Scrolls the window to a specific position
   * @param x X coordinate
   * @param y Y coordinate
   * @param behavior Scroll behavior (smooth, instant, auto)
   */
  scrollTo(x: number, y: number, behavior: ScrollBehavior = 'auto'): void {
    this.window()?.scrollTo({ left: x, top: y, behavior });
  }

  /**
   * Scrolls the window by a specific amount
   * @param x X offset
   * @param y Y offset
   * @param behavior Scroll behavior (smooth, instant, auto)
   */
  scrollBy(x: number, y: number, behavior: ScrollBehavior = 'auto'): void {
    this.window()?.scrollBy({ left: x, top: y, behavior });
  }

  /**
   * Opens a new window/tab
   * @param url URL to open
   * @param target Target window name
   * @param features Window features string
   * @returns Window object or null
   */
  open(url?: string, target?: string, features?: string): Window | null {
    return this.window()?.open(url, target, features) ?? null;
  }

  /**
   * Closes the current window
   */
  close(): void {
    this.window()?.close();
  }

  /**
   * Focuses the window
   */
  focus(): void {
    this.window()?.focus();
  }

  /**
   * Blurs the window
   */
  blur(): void {
    this.window()?.blur();
  }

  /**
   * Adds an event listener to the window
   * @param type Event type
   * @param listener Event listener function
   * @param options Event listener options
   */
  addEventListener<K extends keyof WindowEventMap>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.window()?.addEventListener(type, listener, options);
  }

  /**
   * Removes an event listener from the window
   * @param type Event type
   * @param listener Event listener function
   * @param options Event listener options
   */
  removeEventListener<K extends keyof WindowEventMap>(
    type: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void {
    this.window()?.removeEventListener(type, listener, options);
  }

  /**
   * Gets a computed media query result
   * @param query Media query string
   * @returns MediaQueryList or null if not available
   */
  matchMedia(query: string): MediaQueryList | null {
    return this.window()?.matchMedia(query) ?? null;
  }

  /**
   * Gets a reactive signal for media query matches
   * @param query Media query string
   * @returns Signal that updates when media query changes
   */
  createMediaQuerySignal(query: string): { matches: () => boolean; cleanup: () => void } {
    const matches = signal(false);
    let mediaQuery: MediaQueryList | null = null;
    let cleanup = () => {};

    if (this.isAvailable()) {
      afterNextRender(() => {
        mediaQuery = this.matchMedia(query);
        if (mediaQuery) {
          matches.set(mediaQuery.matches);

          const listener = (e: MediaQueryListEvent) => matches.set(e.matches);
          mediaQuery.addEventListener('change', listener);

          cleanup = () => {
            mediaQuery?.removeEventListener('change', listener);
          };
        }
      });
    }

    return {
      matches: matches.asReadonly(),
      cleanup,
    };
  }

  /**
   * Gets the current user agent string
   * @returns User agent string or empty string if not available
   */
  getUserAgent(): string {
    return this.getNavigator()?.userAgent ?? '';
  }

  /**
   * Gets the current platform
   * @returns Platform string or empty string if not available
   */
  getPlatform(): string {
    return this.getNavigator()?.platform ?? '';
  }

  /**
   * Gets the current language
   * @returns Language string or empty string if not available
   */
  getLanguage(): string {
    return this.getNavigator()?.language ?? '';
  }

  /**
   * Gets all supported languages
   * @returns Array of language strings
   */
  getLanguages(): readonly string[] {
    return this.getNavigator()?.languages ?? [];
  }

  /**
   * Checks if the browser is online
   * @returns True if online, false if offline or unknown
   */
  isOnline(): boolean {
    return this.getNavigator()?.onLine ?? false;
  }

  /**
   * Requests a page reload
   * @param forceReload Whether to force reload from server
   */
  reload(forceReload = false): void {
    this.getLocation()?.reload();
  }

  /**
   * Gets the current page URL
   * @returns URL object or null if not available
   */
  getCurrentUrl(): URL | null {
    const location = this.getLocation();
    if (!location) return null;

    try {
      return new URL(location.href);
    } catch {
      return null;
    }
  }

  /**
   * Navigates to a new URL
   * @param url URL to navigate to
   * @param replace Whether to replace current history entry
   */
  navigate(url: string, replace = false): void {
    const location = this.getLocation();
    if (!location) return;

    if (replace) {
      location.replace(url);
    } else {
      location.href = url;
    }
  }
}
