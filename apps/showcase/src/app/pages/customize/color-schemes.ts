export interface ColorScheme {
  id: string;
  label: string;
  swatch: string;
}

export const COLOR_SCHEMES: ColorScheme[] = [
  { id: 'default', label: 'Default', swatch: 'oklch(0.205 0 0)' },
  { id: 'red', label: 'Red', swatch: 'oklch(0.58 0.22 27)' },
  { id: 'rose', label: 'Rose', swatch: 'oklch(0.62 0.21 15)' },
  { id: 'orange', label: 'Orange', swatch: 'oklch(0.68 0.19 45)' },
  { id: 'green', label: 'Green', swatch: 'oklch(0.6 0.17 152)' },
  { id: 'blue', label: 'Blue', swatch: 'oklch(0.58 0.2 260)' },
  { id: 'yellow', label: 'Yellow', swatch: 'oklch(0.85 0.17 90)' },
  { id: 'violet', label: 'Violet', swatch: 'oklch(0.56 0.22 295)' },
];

export const RADIUS_OPTIONS = [
  { value: '0', label: '0' },
  { value: '0.3rem', label: '0.3' },
  { value: '0.5rem', label: '0.5' },
  { value: '0.75rem', label: '0.75' },
  { value: '1rem', label: '1.0' },
];
