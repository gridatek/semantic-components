import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScSessionStorageService {
  private _isAvailable = signal<boolean>(false);

  constructor() {
    // Check if sessionStorage is available (browser environment)
    this._isAvailable.set(this.checkAvailability());
  }

  /**
   * Returns true if sessionStorage is available (not in SSR)
   */
  readonly isAvailable = computed(() => this._isAvailable());

  /**
   * Checks if sessionStorage is available in the current environment
   */
  private checkAvailability(): boolean {
    try {
      if (typeof window === 'undefined' || typeof Storage === 'undefined') {
        return false;
      }

      const testKey = '__sessionStorage_test__';
      window.sessionStorage.setItem(testKey, 'test');
      window.sessionStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sets an item in sessionStorage
   * @param key The key to store the value under
   * @param value The value to store (will be JSON stringified)
   * @returns true if successful, false if sessionStorage is not available
   */
  setItem<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      console.warn('ScSessionStorageService: sessionStorage is not available');
      return false;
    }

    try {
      const serializedValue = JSON.stringify(value);
      window.sessionStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to set item', { key, error });
      return false;
    }
  }

  /**
   * Gets an item from sessionStorage
   * @param key The key to retrieve
   * @param defaultValue The default value to return if key doesn't exist
   * @returns The stored value or default value
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    if (!this.isAvailable()) {
      return defaultValue ?? null;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      if (item === null) {
        return defaultValue ?? null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to get item', { key, error });
      return defaultValue ?? null;
    }
  }

  /**
   * Removes an item from sessionStorage
   * @param key The key to remove
   * @returns true if successful, false if sessionStorage is not available
   */
  removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      console.warn('ScSessionStorageService: sessionStorage is not available');
      return false;
    }

    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to remove item', { key, error });
      return false;
    }
  }

  /**
   * Clears all items from sessionStorage
   * @returns true if successful, false if sessionStorage is not available
   */
  clear(): boolean {
    if (!this.isAvailable()) {
      console.warn('ScSessionStorageService: sessionStorage is not available');
      return false;
    }

    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to clear sessionStorage', error);
      return false;
    }
  }

  /**
   * Gets all keys from sessionStorage
   * @returns Array of keys or empty array if not available
   */
  getAllKeys(): string[] {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const keys: string[] = [];
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const key = window.sessionStorage.key(i);
        if (key !== null) {
          keys.push(key);
        }
      }
      return keys;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to get all keys', error);
      return [];
    }
  }

  /**
   * Gets the number of items in sessionStorage
   * @returns Number of items or 0 if not available
   */
  getLength(): number {
    if (!this.isAvailable()) {
      return 0;
    }

    try {
      return window.sessionStorage.length;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to get length', error);
      return 0;
    }
  }

  /**
   * Checks if a key exists in sessionStorage
   * @param key The key to check
   * @returns true if key exists, false otherwise
   */
  hasKey(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      return window.sessionStorage.getItem(key) !== null;
    } catch (error) {
      console.error('ScSessionStorageService: Failed to check key', { key, error });
      return false;
    }
  }

  /**
   * Gets multiple items from sessionStorage at once
   * @param keys Array of keys to retrieve
   * @returns Object with key-value pairs
   */
  getMultiple<T>(keys: string[]): Record<string, T | null> {
    const result: Record<string, T | null> = {};

    for (const key of keys) {
      result[key] = this.getItem<T>(key);
    }

    return result;
  }

  /**
   * Sets multiple items in sessionStorage at once
   * @param items Object with key-value pairs to store
   * @returns Object with key-success pairs indicating which items were stored successfully
   */
  setMultiple<T>(items: Record<string, T>): Record<string, boolean> {
    const result: Record<string, boolean> = {};

    for (const [key, value] of Object.entries(items)) {
      result[key] = this.setItem(key, value);
    }

    return result;
  }
}
