/**
 * shadcn's styles (presets) for the components, one entry point each:
 * `@semantic-components/presets/nova`, `…/lyra`…. The app imports its
 * one and gives it to `provideSemanticComponents({ preset })` (nova by default); its
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

/** A breadcrumb's parts that change from style to style. */
export interface ScBreadcrumbStyles {
  /** The list: its gaps and text. */
  list: string;
  item: string;
  ellipsis: string;
}

/** A card's parts that change from style to style (its action is the same in all). */
export interface ScCardStyles {
  /** The card: its text, background and `--card-spacing` (its radius, ring and shadow are `frame`). */
  card: string;
  header: string;
  title: string;
  description: string;
  content: string;
  footer: string;
}

/** A menu's parts that change from style to style. */
export interface ScMenuStyles {
  /** The menu's popup. */
  popup: string;
  /** A submenu's popup. */
  subPopup: string;
  /** A group's label. */
  label: string;
  item: string;
  /** An item that opens a submenu. */
  subTrigger: string;
  checkboxItem: string;
  radioItem: string;
  /** The check or dot of a checkbox or radio item. */
  indicator: string;
  separator: string;
  /** The keyboard hint at the end of an item. */
  shortcut: string;
}

/** A menu bar's parts that change from style to style. */
export interface ScMenubarStyles {
  /** The bar. */
  bar: string;
  /** A bar item, opening its menu. */
  trigger: string;
  /** The menus in the bar: the menu's parts, in the menu bar's look. */
  menu: ScMenuStyles;
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
}

export type ScTabsListVariant = 'default' | 'line';

/** Tabs' parts that change from style to style. */
export interface ScTabsStyles {
  /** The root: the list and the panels, in a column or a row. */
  root: string;
  /** The tab list, by variant. */
  list: (props: { variant?: ScTabsListVariant | null }) => string;
  /** A tab. */
  trigger: string;
  /** A panel. */
  panel: string;
}

export type ScCodeBlockVariant = 'default' | 'destructive';
export type ScCodeBlockLineVariant =
  'default' | 'added' | 'removed' | 'highlighted';

/** A code block's parts that change from style to style. */
export interface ScCodeBlockStyles {
  /** The block, by variant. */
  root: (props: { variant?: ScCodeBlockVariant | null }) => string;
  header: string;
  title: string;
  /** The buttons: in the header, or floating over the code. */
  actions: string;
  /** The scrolling `pre`. */
  content: string;
  /** The `code` in it: the lines' grid. */
  code: string;
  /** A line, by its mark. */
  line: (props: { variant?: ScCodeBlockLineVariant | null }) => string;
  footer: string;
}

/** A dialog's parts that change from style to style. */
export interface ScDialogStyles {
  /** The panel. */
  content: string;
  /** A close straight in the panel (the ✕): its place and fill, as `[&>[data-slot=dialog-close]]:…` classes. */
  close: string;
  header: string;
  footer: string;
  title: string;
  description: string;
}

/** An accordion's parts that change from style to style. */
export interface ScAccordionStyles {
  root: string;
  item: string;
  trigger: string;
  /** The trigger's icon (a chevron), turned while open. */
  icon: string;
  /** The panel: it clips its content while its height animates. */
  panel: string;
  /** Its content's padding and text. */
  content: string;
}

export type ScAttachmentSize = 'default' | 'sm' | 'xs';
export type ScAttachmentOrientation = 'horizontal' | 'vertical';
export type ScAttachmentMediaVariant = 'icon' | 'image';

/** An attachment's parts that change from style to style. */
export interface ScAttachmentStyles {
  root: (props: {
    size?: ScAttachmentSize | null;
    orientation?: ScAttachmentOrientation | null;
  }) => string;
  media: (props: { variant?: ScAttachmentMediaVariant | null }) => string;
  content: string;
  title: string;
  description: string;
  actions: string;
  /** A row of attachments, scrolling. */
  group: string;
}

/** A bubble's parts that change from style to style. */
export interface ScBubbleStyles {
  /** The surface: its corners, padding, text and focus ring. */
  content: string;
  /** The row of reactions over the bubble's edge (its side and end stay the part's). */
  reactions: string;
}

/** A questionnaire's parts that change from style to style. */
export interface ScQuestionnaireStyles {
  root: string;
  progress: string;
  item: string;
  title: string;
  description: string;
  choices: string;
  /** A choice's card, its state from its input (`has-[>input:checked]`). */
  choice: string;
  /** The radio's or checkbox's box, with your check icon (`[&>svg]:`). */
  indicator: string;
  /** A chosen radio's dot. */
  indicatorDot: string;
  choiceLabel: string;
  shortcut: string;
  error: string;
  actions: string;
}

/** A preset: the components' classes in one of shadcn's styles. */
export interface ScPreset {
  accordion: ScAccordionStyles;
  alert: ScAlertStyles;
  alertDialog: ScAlertDialogStyles;
  attachment: ScAttachmentStyles;
  bubble: ScBubbleStyles;
  /** An avatar group's "+N" (the rest of the avatar is the same in every style). */
  avatarGroupCount: string;
  /** The backdrop behind every overlay (dialogs, sheets, drawers): its shade and blur. */
  backdrop: string;
  badge: (props: { variant?: ScBadgeVariant | null }) => string;
  breadcrumb: ScBreadcrumbStyles;
  button: (props: {
    variant?: ScButtonVariant | null;
    size?: ScButtonSize | null;
  }) => string;
  card: ScCardStyles;
  codeBlock: ScCodeBlockStyles;
  /** scFrame: a box's frame — the style's card radius, ring and shadow. */
  frame: string;
  controlGroup: (props: {
    orientation?: ScControlGroupOrientation | null;
  }) => string;
  /** The text beside a group's buttons. */
  controlGroupText: string;
  dialog: ScDialogStyles;
  /** The Menu's parts in a context menu. */
  contextMenu: ScMenuStyles;
  /** A text field (`input[scInput]`, and the inputs that look like one). */
  input: string;
  /** The group, and what it gives its input or textarea (`[data-slot=control]`). */
  inputGroup: string;
  inputGroupAddon: (props: { align?: ScInputGroupAddonAlign | null }) => string;
  /** Over the preset's button, in an input group. */
  inputGroupButton: (props: { size?: ScInputGroupButtonSize | null }) => string;
  inputGroupText: string;
  menu: ScMenuStyles;
  menubar: ScMenubarStyles;
  pagination: ScPaginationStyles;
  questionnaire: ScQuestionnaireStyles;
  select: ScSelectStyles;
  table: ScTableStyles;
  tabs: ScTabsStyles;
}
