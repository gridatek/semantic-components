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

export type ScControlGroupOrientation = 'horizontal' | 'vertical';

export type ScInputGroupAddonAlign =
  'inline-start' | 'inline-end' | 'block-start' | 'block-end';

export type ScInputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

/** A select's parts, each its classes: shadcn's on Radix. */
export interface ScSelectStyles {
  trigger: string;
  /** The chevron in the trigger. */
  icon: string;
  popup: string;
  /** Played as the popup opens (Angular's `animate.enter`). */
  popupEnter: string;
  /** Played as it closes (`animate.leave`). */
  popupLeave: string;
  /** Added to the popup when it opens below or above the trigger. */
  popupPopper: string;
  /** The list (Radix's Viewport). */
  viewport: string;
  group: string;
  groupLabel: string;
  item: string;
  /** The check on the selected item. */
  itemIndicator: string;
  separator: string;
  scrollUpButton: string;
  scrollDownButton: string;
}

/** A preset: the components' classes in one of shadcn's styles. */
export interface ScPreset {
  button: (props: {
    variant?: ScButtonVariant | null;
    size?: ScButtonSize | null;
  }) => string;
  controlGroup: (props: {
    orientation?: ScControlGroupOrientation | null;
  }) => string;
  /** The text beside a group's buttons. */
  controlGroupText: string;
  /** A text field (`input[scInput]`, and the inputs that look like one). */
  input: string;
  /** The group, and what it gives its input or textarea (`[data-slot=control]`). */
  inputGroup: string;
  inputGroupAddon: (props: { align?: ScInputGroupAddonAlign | null }) => string;
  /** Over the preset's button, in an input group. */
  inputGroupButton: (props: { size?: ScInputGroupButtonSize | null }) => string;
  inputGroupText: string;
  select: ScSelectStyles;
}
