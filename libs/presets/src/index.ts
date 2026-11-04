/**
 * shadcn's styles (presets) for the components, one entry point each:
 * `@semantic-components/presets/nova`, `…/lyra`…. The app imports its
 * one and gives it to `provideScConfig({ preset })` (nova by default); its
 * styles.css points Tailwind at that folder only, so only that preset's
 * classes are scanned.
 */
export type ScPresetName =
  'nova' | 'vega' | 'maia' | 'lyra' | 'mira' | 'luma' | 'sera' | 'rhea';

export type ScAlertVariant = 'default' | 'destructive';

export type ScBadgeVariant =
  'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

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

/** An alert's parts, in one of shadcn's styles. */
export interface ScAlertStyles {
  alert: (props: { variant?: ScAlertVariant | null }) => string;
  title: string;
  description: string;
  /** A button at the end, in the alert's corner. */
  action: string;
}

/** An alert dialog's parts, in one of shadcn's styles. */
export interface ScAlertDialogStyles {
  /** The dialog box (`div[scAlertDialog]`). */
  content: string;
  header: string;
  footer: string;
  media: string;
  title: string;
  description: string;
}

/** A card's parts that change from style to style (its action is the same in all). */
export interface ScCardStyles {
  /** The card: its radius, ring, shadow, text and `--card-spacing`. */
  card: string;
  header: string;
  title: string;
  description: string;
  content: string;
  footer: string;
}

/** A pagination's parts that change from style to style. */
export interface ScPaginationStyles {
  /** The list of pages. */
  list: string;
  ellipsis: string;
  /** Over the preset's button, on Previous (and First). */
  previous: string;
  /** Over the preset's button, on Next (and Last). */
  next: string;
}

/** A table's parts that change from style to style. */
export interface ScTableStyles {
  /** The table: its text size. */
  table: string;
  /** A header cell (`th`). */
  headerCell: string;
  /** A cell (`td`). */
  cell: string;
  caption: string;
  /** The container's frame (`bordered`): the card's radius, ring and shadow. */
  bordered: string;
}

/** A preset: the components' classes in one of shadcn's styles. */
export interface ScPreset {
  alert: ScAlertStyles;
  alertDialog: ScAlertDialogStyles;
  /** The backdrop behind every overlay (dialogs, sheets, drawers): its shade and blur. */
  backdrop: string;
  badge: (props: { variant?: ScBadgeVariant | null }) => string;
  button: (props: {
    variant?: ScButtonVariant | null;
    size?: ScButtonSize | null;
  }) => string;
  card: ScCardStyles;
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
  pagination: ScPaginationStyles;
  select: ScSelectStyles;
  table: ScTableStyles;
}
