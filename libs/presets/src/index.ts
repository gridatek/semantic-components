/**
 * shadcn's styles (presets) for the components, one entry point each:
 * `@semantic-components/presets/nova`, `…/lyra`…. The app imports its
 * one and gives it to `provideSemanticComponents({ preset })` (nova by default); its
 * styles.css points Tailwind at that folder only, so only that preset's
 * classes are scanned.
 */
export type ScPresetName =
  'nova' | 'vega' | 'maia' | 'lyra' | 'mira' | 'luma' | 'sera' | 'rhea';

export type ScAlertVariant = 'default' | 'destructive' | 'success' | 'warning';

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

/** A trace's parts that change from style to style. */
export interface ScTraceStyles {
  /** The rows, and any trigger or link around a line. */
  root: string;
  line: string;
  icon: string;
  /** The chevron after a collapsible line, turned while open. */
  collapsibleIcon: string;
  collapsibleTrigger: string;
  collapsibleContent: string;
}

/** A marker's parts that change from style to style. */
export interface ScMarkerStyles {
  /** Its base: text size, icon size (the variants stay the part's). */
  root: string;
  icon: string;
}

/** A message's parts that change from style to style. */
export interface ScMessageStyles {
  group: string;
  root: string;
  content: string;
  header: string;
  /** At the message's end when it is yours (align end). */
  footer: string;
}

export type ScItemVariant = 'default' | 'outline' | 'muted';
export type ScItemSize = 'default' | 'sm' | 'xs';
export type ScItemMediaVariant = 'default' | 'icon' | 'image';

/** An item's parts that change from style to style. */
export interface ScItemStyles {
  root: (props: {
    variant?: ScItemVariant | null;
    size?: ScItemSize | null;
  }) => string;
  media: (props: { variant?: ScItemMediaVariant | null }) => string;
  body: string;
  title: string;
  description: string;
}

export type ScEmptyMediaVariant = 'default' | 'icon';

/** An empty state's parts that change from style to style. */
export interface ScEmptyStyles {
  root: string;
  header: string;
  media: (props: { variant?: ScEmptyMediaVariant | null }) => string;
  title: string;
  description: string;
  /** The actions below (shadcn's EmptyContent). */
  body: string;
}

/** A tooltip's look: its popup and its arrow (placed by `data-side`). */
export interface ScTooltipStyles {
  popup: string;
  arrow: string;
}

/** A popover's parts that change from style to style. */
export interface ScPopoverStyles {
  popup: string;
  header: string;
  title: string;
  description: string;
}

/** A sheet's parts that change from style to style. */
export interface ScSheetStyles {
  /** The panel, by `data-side`: its place, size and slide. */
  content: string;
  /** A close straight in the panel (the ✕): its place, as `[&>[data-slot=sheet-close]]:…` classes. */
  close: string;
  header: string;
  footer: string;
  title: string;
  description: string;
}

/** A drawer's parts that change from style to style. */
export interface ScDrawerStyles {
  /** The panel's look, by `data-swipe-direction`: colours, corners, borders, an inset. */
  content: string;
  /** The swipe handle's bar (`after:`), by the panel's `data-swipe-axis`. */
  handle: string;
  header: string;
  footer: string;
  title: string;
  description: string;
}

/** A preview card's look, from style to style. */
export interface ScPreviewCardStyles {
  popup: string;
}

/** A scroll area's parts that change from style to style. */
export interface ScScrollAreaStyles {
  /** The scrollbar's thumb (Scroll Area Next: drawn). */
  thumb: string;
  /** The same look on the browser's scrollbar thumb, `::-webkit-scrollbar-thumb` (Scroll Area Next2). */
  nativeThumb: string;
}

/** A resizable's parts that change from style to style. */
export interface ScResizableStyles {
  /** The handle's grip. */
  grip: string;
}

/** A progress bar's parts that change from style to style. */
export interface ScProgressStyles {
  /** The bar's track: its height, corners and color. */
  track: string;
  label: string;
  /** The value as text. */
  value: string;
  /** The circle's arc: its ends, square where the style's corners are. */
  arc: string;
}

/** A label's look, from style to style. */
export interface ScLabelStyles {
  /** A label alone: its text. */
  label: string;
  /** What it adds in a field: as a choice card around one, its border, corners, padding and ring. */
  field: string;
}

/** A field's parts that change from style to style: their spacing and text. */
export interface ScFieldStyles {
  /** A fieldset. */
  set: string;
  legend: string;
  group: string;
  /** A field (its orientation's layout is the part's). */
  field: string;
  /** Its title and description beside a control (shadcn's FieldContent). */
  body: string;
  title: string;
  description: string;
  separator: string;
  /** Its errors. */
  error: string;
}

/** A radio group's parts that change from style to style. */
export interface ScRadioGroupStyles {
  /** The group, stacked. */
  group: string;
  /** A radio (a native input, appearance-none). */
  item: string;
  /** Its dot when checked (its ::before). */
  dot: string;
}

/** A checkbox's parts that change from style to style. */
export interface ScCheckboxStyles {
  /** The native checkbox drawing itself (appearance-none). */
  item: string;
  /** Its check or minus when checked or indeterminate (its ::before, masked). */
  mark: string;
}

/** A switch's parts that change from style to style. */
export interface ScSwitchStyles {
  /** The track: the native checkbox (appearance-none), its size from data-size. */
  track: string;
  /** The thumb: its ::before, moved when checked. */
  thumb: string;
}

/** A slider's parts that change from style to style. */
export interface ScSliderStyles {
  /** The native range: its thickness (the thumb's), and the thumb's size along the track. */
  root: string;
  /** The track (::-webkit-slider-runnable-track, ::-moz-range-track), and Firefox's range. */
  track: string;
  /** The thumb (::-webkit-slider-thumb, ::-moz-range-thumb). */
  thumb: string;
}

/** A toggle's look: its variants, the same in every style. */
export type ScToggleVariant = 'default' | 'outline';
/** A toggle's size. */
export type ScToggleSize = 'default' | 'sm' | 'lg';

/** A toggle group's parts that change from style to style. */
export interface ScToggleGroupStyles {
  /** The group: its layout, gap (--gap) and corners. */
  group: string;
  /** An item's place in the group (joined when spacing is 0); its look is the toggle key's. */
  item: string;
}

/** An OTP field's parts that change from style to style. */
export interface ScOtpFieldStyles {
  /** A group: one chunk of inputs, joined into one box (separate boxes in sera). */
  group: string;
  /** An input: one character (shadcn's slot; its active look on :focus). */
  input: string;
  /** A separator between groups. */
  separator: string;
}

/** A toast's parts that change from style to style. */
export interface ScToastStyles {
  /** The toast: its border, colours, shadow and corners. */
  toast: string;
  /** The stack's corners, for its focus ring (the hotkey focuses it). */
  list: string;
}

/** A native select's parts that change from style to style. */
export interface ScNativeSelectStyles {
  /** The select: its size (`data-[size=sm]:`), corners, border, background, focus and invalid rings. */
  select: string;
  /** The chevron's place and size. */
  icon: string;
}

/** A command's parts that change from style to style. */
export interface ScCommandStyles {
  /** The command: its corners, padding and colours. */
  root: string;
  /** On the scDialog it sits in: no padding, its corners (important over the dialog's own). */
  dialog: string;
  /** Around the search box. */
  inputWrapper: string;
  /** The search box, over the preset's input group: its height, background, border. */
  inputGroup: string;
  /** Your search icon, through its addon. */
  inputIcon: string;
  /** The search input. */
  input: string;
  /** The scrolling list. */
  list: string;
  /** The text when nothing matches. */
  empty: string;
  /** A group of items. */
  group: string;
  /** A group's heading. */
  groupLabel: string;
  /** An item: highlighted (data-selected), disabled (data-disabled="true"). */
  item: string;
  /** Between groups. */
  separator: string;
  /** A key hint at the end of an item. */
  shortcut: string;
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
  /** A calendar's root: its padding, --cell-size and --cell-radius. */
  calendar: string;
  card: ScCardStyles;
  checkbox: ScCheckboxStyles;
  codeBlock: ScCodeBlockStyles;
  /** scFrame: a box's frame — the style's card radius, ring and shadow. */
  command: ScCommandStyles;
  frame: string;
  controlGroup: (props: {
    orientation?: ScControlGroupOrientation | null;
  }) => string;
  /** The text beside a group's buttons. */
  controlGroupText: string;
  dialog: ScDialogStyles;
  drawer: ScDrawerStyles;
  empty: ScEmptyStyles;
  field: ScFieldStyles;
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
  item: ScItemStyles;
  /** A key. */
  kbd: string;
  label: ScLabelStyles;
  marker: ScMarkerStyles;
  menu: ScMenuStyles;
  menubar: ScMenubarStyles;
  message: ScMessageStyles;
  /** A message scroller's rows: the gap between them. */
  messageScrollerContent: string;
  nativeSelect: ScNativeSelectStyles;
  otpField: ScOtpFieldStyles;
  pagination: ScPaginationStyles;
  popover: ScPopoverStyles;
  previewCard: ScPreviewCardStyles;
  progress: ScProgressStyles;
  questionnaire: ScQuestionnaireStyles;
  radioGroup: ScRadioGroupStyles;
  resizable: ScResizableStyles;
  scrollArea: ScScrollAreaStyles;
  select: ScSelectStyles;
  sheet: ScSheetStyles;
  slider: ScSliderStyles;
  switch: ScSwitchStyles;
  /** A placeholder while content loads. */
  skeleton: string;
  table: ScTableStyles;
  tabs: ScTabsStyles;
  /** A multi-line text field. */
  textarea: string;
  /** A toggle's look (shadcn's toggleVariants): a button that stays pressed. */
  toast: ScToastStyles;
  toggle: (props: {
    variant?: ScToggleVariant | null;
    size?: ScToggleSize | null;
  }) => string;
  toggleGroup: ScToggleGroupStyles;
  tooltip: ScTooltipStyles;
  trace: ScTraceStyles;
}
