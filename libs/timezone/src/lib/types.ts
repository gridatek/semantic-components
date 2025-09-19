export interface ScTimezone {
  id: string; // e.g., "America/New_York"
  label: string; // e.g., "(GMT-05:00) New York"
  city: string; // e.g., "New York"
  offset: string; // e.g., "GMT-05:00"
  region: string; // e.g., "America"
}

export interface TimezoneChangeEvent {
  isValid: boolean;
  timezone: string;
  label: string;
  offset: string;
}
