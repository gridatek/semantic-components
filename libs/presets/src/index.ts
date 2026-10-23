/**
 * shadcn's styles (presets) for the components, one entry point each:
 * `@semantic-components/presets/nova`, `…/lyra`…. The app imports its
 * one and gives it to `provideScConfig({ preset })` (nova by default); its
 * styles.css points Tailwind at that folder only, so only that preset's
 * classes are scanned.
 */
export type ScPresetName =
  'nova' | 'vega' | 'maia' | 'lyra' | 'mira' | 'luma' | 'sera' | 'rhea';

export type ScButtonVariant =
  'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';

export type ScButtonSize =
  'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';

/** A preset: the components' classes in one of shadcn's styles. */
export interface ScPreset {
  button: (props: {
    variant?: ScButtonVariant | null;
    size?: ScButtonSize | null;
  }) => string;
}
