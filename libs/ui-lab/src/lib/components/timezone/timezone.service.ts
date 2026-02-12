import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  signal,
} from '@angular/core';

export interface Timezone {
  id: string;
  label: string;
  offset: string;
  abbr: string;
}

export interface TimezoneConfig {
  /** List of available timezones. If not provided, uses a default list of common timezones. */
  timezones?: Timezone[];
  /** Default timezone ID. If not provided, uses the browser's timezone. */
  defaultTimezone?: string;
  /** Storage key for persisting timezone preference */
  storageKey?: string;
}

const DEFAULT_TIMEZONES: Timezone[] = [
  { id: 'Pacific/Honolulu', label: 'Hawaii', offset: '-10:00', abbr: 'HST' },
  { id: 'America/Anchorage', label: 'Alaska', offset: '-09:00', abbr: 'AKST' },
  {
    id: 'America/Los_Angeles',
    label: 'Pacific Time',
    offset: '-08:00',
    abbr: 'PST',
  },
  {
    id: 'America/Denver',
    label: 'Mountain Time',
    offset: '-07:00',
    abbr: 'MST',
  },
  {
    id: 'America/Chicago',
    label: 'Central Time',
    offset: '-06:00',
    abbr: 'CST',
  },
  {
    id: 'America/New_York',
    label: 'Eastern Time',
    offset: '-05:00',
    abbr: 'EST',
  },
  { id: 'America/Sao_Paulo', label: 'Brasilia', offset: '-03:00', abbr: 'BRT' },
  { id: 'Atlantic/Azores', label: 'Azores', offset: '-01:00', abbr: 'AZOT' },
  { id: 'UTC', label: 'UTC', offset: '+00:00', abbr: 'UTC' },
  { id: 'Europe/London', label: 'London', offset: '+00:00', abbr: 'GMT' },
  { id: 'Europe/Paris', label: 'Paris', offset: '+01:00', abbr: 'CET' },
  { id: 'Europe/Berlin', label: 'Berlin', offset: '+01:00', abbr: 'CET' },
  { id: 'Africa/Cairo', label: 'Cairo', offset: '+02:00', abbr: 'EET' },
  { id: 'Europe/Moscow', label: 'Moscow', offset: '+03:00', abbr: 'MSK' },
  { id: 'Asia/Dubai', label: 'Dubai', offset: '+04:00', abbr: 'GST' },
  { id: 'Asia/Kolkata', label: 'India', offset: '+05:30', abbr: 'IST' },
  { id: 'Asia/Dhaka', label: 'Dhaka', offset: '+06:00', abbr: 'BST' },
  { id: 'Asia/Bangkok', label: 'Bangkok', offset: '+07:00', abbr: 'ICT' },
  { id: 'Asia/Singapore', label: 'Singapore', offset: '+08:00', abbr: 'SGT' },
  { id: 'Asia/Shanghai', label: 'China', offset: '+08:00', abbr: 'CST' },
  { id: 'Asia/Tokyo', label: 'Tokyo', offset: '+09:00', abbr: 'JST' },
  { id: 'Australia/Sydney', label: 'Sydney', offset: '+11:00', abbr: 'AEDT' },
  { id: 'Pacific/Auckland', label: 'Auckland', offset: '+13:00', abbr: 'NZDT' },
];

export const SC_TIMEZONE_CONFIG = new InjectionToken<TimezoneConfig>(
  'SC_TIMEZONE_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      timezones: DEFAULT_TIMEZONES,
      storageKey: 'sc-timezone',
    }),
  },
);

@Injectable({ providedIn: 'root' })
export class ScTimezoneService {
  private readonly config = inject(SC_TIMEZONE_CONFIG);
  private readonly storageKey = this.config.storageKey ?? 'sc-timezone';

  /** All available timezones */
  readonly timezones = signal<Timezone[]>(
    this.config.timezones ?? DEFAULT_TIMEZONES,
  );

  /** Current timezone ID */
  readonly timezone = signal<string>(this.detectCurrentTimezone());

  /** Current timezone object */
  readonly currentTimezone = computed(() => {
    const id = this.timezone();
    return this.timezones().find((tz) => tz.id === id) ?? this.timezones()[0];
  });

  /** Current time formatted in the selected timezone */
  readonly currentTimeFormatted = computed(() => {
    const tz = this.currentTimezone();
    return this.formatTime(tz.id);
  });

  /**
   * Set the timezone preference.
   */
  setTimezone(timezoneId: string): void {
    const timezone = this.timezones().find((tz) => tz.id === timezoneId);
    if (!timezone) {
      console.warn(`Timezone "${timezoneId}" is not configured.`);
      return;
    }

    this.timezone.set(timezoneId);
    this.storeTimezone(timezoneId);
  }

  /**
   * Get the browser's current timezone.
   */
  getBrowserTimezone(): string {
    if (typeof Intl === 'undefined') {
      return 'UTC';
    }
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /**
   * Format a date in the specified timezone.
   */
  formatDate(
    date: Date,
    timezoneId?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    const tz = timezoneId ?? this.timezone();
    const defaultOptions: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      dateStyle: 'medium',
    };
    return new Intl.DateTimeFormat('en-US', {
      ...defaultOptions,
      ...options,
    }).format(date);
  }

  /**
   * Format a time in the specified timezone.
   */
  formatTime(
    timezoneId?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    const tz = timezoneId ?? this.timezone();
    const now = new Date();
    const defaultOptions: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', {
      ...defaultOptions,
      ...options,
    }).format(now);
  }

  /**
   * Format a datetime in the specified timezone.
   */
  formatDateTime(
    date: Date,
    timezoneId?: string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    const tz = timezoneId ?? this.timezone();
    const defaultOptions: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      dateStyle: 'medium',
      timeStyle: 'short',
    };
    return new Intl.DateTimeFormat('en-US', {
      ...defaultOptions,
      ...options,
    }).format(date);
  }

  private detectCurrentTimezone(): string {
    // First, check stored preference
    const stored = this.getStoredTimezone();
    if (stored && this.isValidTimezone(stored)) {
      return stored;
    }

    // Then, use default from config
    if (
      this.config.defaultTimezone &&
      this.isValidTimezone(this.config.defaultTimezone)
    ) {
      return this.config.defaultTimezone;
    }

    // Finally, try browser timezone
    const browserTz = this.getBrowserTimezone();
    if (this.isValidTimezone(browserTz)) {
      return browserTz;
    }

    // Fallback to UTC
    return 'UTC';
  }

  private isValidTimezone(timezoneId: string): boolean {
    const timezones = this.config.timezones ?? DEFAULT_TIMEZONES;
    return timezones.some((tz) => tz.id === timezoneId);
  }

  private getStoredTimezone(): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.storageKey);
  }

  private storeTimezone(timezoneId: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, timezoneId);
    }
  }
}
