import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private preferencesSubject = new BehaviorSubject<CookiePreferences | null>(null);
  public preferences$: Observable<CookiePreferences | null> =
    this.preferencesSubject.asObservable();

  constructor() {
    this.loadPreferences();
  }

  private loadPreferences() {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      this.preferencesSubject.next(JSON.parse(saved));
    }
  }

  setPreferences(preferences: CookiePreferences) {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    this.preferencesSubject.next(preferences);
  }

  getPreferences(): CookiePreferences | null {
    return this.preferencesSubject.value;
  }

  hasConsent(type: keyof CookiePreferences): boolean {
    const prefs = this.getPreferences();
    return prefs ? prefs[type] : false;
  }

  clearPreferences() {
    localStorage.removeItem('cookiePreferences');
    this.preferencesSubject.next(null);
  }
}
