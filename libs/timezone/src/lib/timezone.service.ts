import { Injectable } from '@angular/core';

import { ScTimezone } from './types';

@Injectable({ providedIn: 'root' })
export class TimezoneService {
  private cache: Record<string, unknown> = {};

  // Public: returns array of ScTimezone for a given locale
  async getTimezones(locale = 'en'): Promise<ScTimezone[]> {
    const tzData = await this.loadLocale(locale);
    const zones = this.getSupportedTimezones();

    return zones.map((tz: string) =>
      this.createTimezone(tz, tzData as Record<string, unknown>, locale),
    );
  }

  // Legacy method for backward compatibility
  async getTimezonesLegacy(locale = 'en'): Promise<{ value: string; label: string }[]> {
    const timezones = await this.getTimezones(locale);
    return timezones.map((tz) => ({
      value: tz.id,
      label: tz.label,
    }));
  }

  private getSupportedTimezones(): string[] {
    // Use Intl.supportedValuesOf if available (ES2022+), otherwise fallback to common timezones
    if (
      'supportedValuesOf' in Intl &&
      typeof (Intl as Record<string, unknown>)['supportedValuesOf'] === 'function'
    ) {
      return (
        (Intl as Record<string, unknown>)['supportedValuesOf'] as (input: string) => string[]
      )('timeZone');
    }

    // Fallback list of common timezones
    return [
      'UTC',
      'Africa/Cairo',
      'Africa/Johannesburg',
      'Africa/Lagos',
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'America/Mexico_City',
      'America/Sao_Paulo',
      'America/Argentina/Buenos_Aires',
      'Asia/Tokyo',
      'Asia/Shanghai',
      'Asia/Kolkata',
      'Asia/Dubai',
      'Asia/Singapore',
      'Asia/Seoul',
      'Asia/Hong_Kong',
      'Asia/Bangkok',
      'Asia/Manila',
      'Australia/Sydney',
      'Australia/Melbourne',
      'Europe/London',
      'Europe/Berlin',
      'Europe/Paris',
      'Europe/Rome',
      'Europe/Madrid',
      'Europe/Amsterdam',
      'Europe/Stockholm',
      'Europe/Moscow',
      'Pacific/Auckland',
      'Pacific/Honolulu',
    ];
  }

  // Simple fallback without CLDR dependency
  private async loadLocale(locale: string): Promise<unknown> {
    const short = (locale || 'en').split('-')[0];
    if (this.cache[short]) return this.cache[short];

    // For now, return empty object since we'll use simple city name extraction
    // In the future, this could be enhanced with actual locale data
    const emptyData = {};
    this.cache[short] = emptyData;
    return emptyData;
  }

  // Create a complete timezone object
  private createTimezone(tz: string, _tzData: Record<string, unknown>, locale: string): ScTimezone {
    const parts = tz.split('/');
    const region = parts[0] || '';
    const city = parts.slice(1).join('/');

    // Simple city name extraction (replacing underscores with spaces)
    const cityName = city ? city.replace(/_/g, ' ').split('/').pop() || tz : tz;

    // Get localized offset using Intl.DateTimeFormat
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    });

    const offsetPart =
      formatter.formatToParts(now).find((p) => p.type === 'timeZoneName')?.value || '';
    const offset = offsetPart || 'UTC';

    // Example label: "(GMT+02:00) Berlin"
    const label = `(${offset}) ${cityName}`;

    return {
      id: tz,
      label,
      city: cityName,
      offset,
      region,
    };
  }

  // Build human-friendly label with city name and localized offset
  private getLabel(tz: string, _tzData: Record<string, unknown>, locale: string): string {
    const timezone = this.createTimezone(tz, _tzData, locale);
    return timezone.label;
  }
}
