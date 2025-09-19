import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimezoneService {
  private cache: Record<string, any> = {};

  // Public: returns array of { value, label } for a given locale
  async getTimezones(locale: string = 'en'): Promise<{ value: string; label: string }[]> {
    const tzData = await this.loadLocale(locale);
    const zones = Intl.supportedValuesOf('timeZone');

    return zones.map((tz) => ({ value: tz, label: this.getLabel(tz, tzData, locale) }));
  }

  // Lazy-load CLDR locale JSON and cache
  private async loadLocale(locale: string): Promise<any> {
    const short = (locale || 'en').split('-')[0];
    if (this.cache[short]) return this.cache[short];

    try {
      const data = await import(
        /* webpackChunkName: "tz-[request]" */
        `cldr-localenames-full/main/${short}/timeZoneNames.json`
      );
      const tzData = (data as any).default.main[short].timeZoneNames;
      this.cache[short] = tzData;
      return tzData;
    } catch (err) {
      // Fallback to English
      if (short !== 'en') {
        const enData = await import('cldr-localenames-full/main/en/timeZoneNames.json');
        const tzData = (enData as any).default.main.en.timeZoneNames;
        this.cache['en'] = tzData;
        return tzData;
      }
      // If even English failed (unlikely), return empty
      return {};
    }
  }

  // Build human-friendly label with translated city (from CLDR) and localized offset
  private getLabel(tz: string, tzData: any, locale: string): string {
    const parts = tz.split('/');
    const region = parts[0];
    const city = parts.slice(1).join('/'); // some tz have multiple parts

    // CLDR structure: tzData["zoneFormats"] or tzData['zone']? we're using localenames: tzData['zone'] is sometimes nested.
    // The cldr-localenames-full timeZoneNames has a structure; we attempt common lookups.
    let translated = undefined;

    try {
      // Preferred: tzData['zone']?.[region]?.[city]
      translated = tzData?.zone?.[region]?.[city];
    } catch (e) {
      translated = undefined;
    }

    // fallback to nested keys or region-city combinations
    if (!translated) {
      // sometimes CLDR uses 'Europe' : { 'Berlin' : '...' }
      const cityKey = city.replace(/_/g, ' ');
      translated =
        tzData?.zone?.[region]?.[cityKey] ||
        tzData?.[region]?.[city] ||
        tzData?.[region]?.[cityKey];
    }

    if (!translated) translated = city.replace(/_/g, ' ').split('/').pop() || tz;

    // Localized offset
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    });

    const offsetPart =
      formatter.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value || '';
    const offsetLabel = offsetPart ? `(${offsetPart})` : '';

    // Example label: "(GMT+02:00) Berlin" — keep GMT prefix standardized for clarity
    // Some locales may use different wording; we keep a consistent format but localize the offset itself
    return `${offsetLabel} ${translated}`.trim();
  }
}
