# Reference libraries

For a component shadcn/ui doesn't have — or whose behaviour shadcn leaves to
another library, as its charts do to Recharts — the libraries we follow: what
they do, what we took, and what is still open. We follow their behaviour and
layout — never their CSS; the look stays ours (shadcn's tokens).

Check them before deciding how a component behaves — don't guess.

## Charts

shadcn's charts are [Recharts](https://recharts.org) with shadcn's config,
tooltip and legend around it. Ours (`ui/charts`) take Recharts' API — composable
parts, their option names, their chart types — and shadcn's look, but the
drawing is our own: d3 for the maths (scales, shapes, stacks, the treemap and
sankey layouts), Angular templates and signals for the SVG. Recharts' code isn't
used; it's React.

| Library                                          | What to read                                                                                                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Recharts](https://recharts.org)                 | The [API docs](https://recharts.org/en-US/api), part by part; the [source](https://github.com/recharts/recharts/tree/main/src) (`cartesian/`, `polar/`, `chart/`, `component/`); its [issues](https://github.com/recharts/recharts/issues) |
| [shadcn/ui charts](https://ui.shadcn.com/charts) | The examples (our checklist), the [chart docs](https://ui.shadcn.com/docs/components/chart): config, tooltip, legend; the styles in `registry/styles/style-nova.css`                                                                       |

**Check Recharts first when:**

- **Fixing a chart bug.** Recharts has met most of them — edge cases in stacks,
  negative values, empty data, a single row, labels that collide, a pointer
  between two points. Read how its part handles it (source, issues) before
  writing our own fix.
- **Writing or changing a part's README.** Its API docs say what each option
  does and its default; ours should cover the same ground, in our words.
- **Adding an option or a type.** Use its name and its default unless we have
  a reason not to (see below), so its examples port.

**Taken:**

- **The parts**: a plot holding a grid, axes, a cursor, series and labels
  (`LabelList`), with a tooltip and a legend.
- **The names**: `layout` (`vertical`), `stackOffset` (`expand`), `stack`
  (Recharts' `stackId`), `startAngle` / `endAngle`, `innerRadius`,
  `outerRadius`, `padAngle`, `cornerRadius`, label positions.
- **The types**: shadcn's six (area, bar, line, pie, radial, radar), then
  Recharts' scatter, funnel, treemap, sunburst and sankey.

**Ours, on purpose:**

- **Directives on the consumer's elements** (`<g scChartBar>`,
  `<svg scChartPlot>`), not components that render their own tags.
- **The axes are named by what they show**: `scChartCategoryAxis` and
  `scChartValueAxis`, not `XAxis` and `YAxis` — laid out `vertical`, the
  categories run down the side.
- **The keyboard and screen readers by default**: the plot is one tab stop,
  ←/→, Home and End move through the rows, the tooltip is a live region
  (Recharts: an opt-in `accessibilityLayer`).
- **A scatter's axes span its values**, not from 0 (Recharts' number axis
  default).
- **Less API**: no callback per event where state or Signal Forms cover it.

**Open — to follow it later:**

- **Animations.** Recharts animates its series as they appear and when the
  data changes (`isAnimationActive`, `animationBegin`, `animationDuration`,
  `animationEasing`); ours don't animate yet. Read how each series animates
  (bars grow from their base, lines draw along, slices sweep) and its
  defaults; honour `prefers-reduced-motion`.
- **What it has that we don't**: its other options per part (`Brush`,
  `ReferenceLine`, `ReferenceArea`, `ErrorBar`, axis `domain`, …), checked
  against shadcn's examples first.

## Link

A link styled as a button (`a[scLink]`). shadcn has no Link component — its Button page styles an `<a>` with `buttonVariants` — so it is checked against these (2026-10-30):

| Library                                                                                                | What to read                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Base UI Button](https://base-ui.com/react/components/button)                                          | No link component: a Button must not render a link; a link that looks like a button is an `<a>` styled with CSS                                                                                 |
| [Angular Material](https://github.com/angular/components/blob/main/src/material/button/button-base.ts) | `a[mat-button]`: no `href` input, no default, no check or warning for a missing one; disabled: `aria-disabled`, `tabindex="-1"`, clicks stopped (`preventDefault` + `stopImmediatePropagation`) |
| [React Aria Link](https://react-aria.adobe.com/Link)                                                   | `isDisabled` blocks navigation and keeps the link announced; a link without `href` becomes `role="link"`                                                                                        |

**Taken:**

- **The address is the consumer's** (`href` or `routerLink`), as Angular Material: no `href` input, no default `'#'`, nothing written by the link; without one, the `<a>` is not a link — documented, not warned about (the user's choice).
- **Disabled** as Angular Material, plus middle-click, and in the capture phase so a `routerLink` never hears the click; the `href` kept, as React Aria.

## Input

A native text field (`input[scInput]`). A shadcn component: Base UI and shadcn's reference app (2026-10-30).

| Library                                                     | What to read                                                                                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Base UI Input (`@base-ui/react/docs`)                       | A native input that works with Field; must have an accessible name (a label or Field); state attributes (`data-invalid`, `data-dirty`, `data-filled`…) |
| shadcn Input (`shadcn-reference/presets/*/input.tsx`, docs) | Eight looks; examples: Field, Field Group, Disabled, Invalid, File, Inline, Grid, Required, Badge, Input Group, Button Group, Form, RTL                |

**Taken:**

- **The name rule**, as Base UI: a label or `aria-label`, and a dev warning without one (`ɵwarnIfUnnamed`).
- **Each preset's look**, from its own `input.tsx`; the parts that look like an input share it.
- **Not Base UI's state attributes**: Signal Forms holds that state (`touched`, `dirty`, `invalid`), and `aria-invalid` / `disabled` are what the styles read.

## Input Group

An input or a textarea with addons in one box (`div[scInputGroup]`). A shadcn component: Base UI has none; shadcn's reference app (2026-10-30).

| Library                                                                 | What to read                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Input Group (`shadcn-reference/presets/*/input-group.tsx`, docs) | Six parts (group, addon, button, text, input, textarea); a click on an addon focuses the input; addons after the input for focus order, `align` to place them; a custom control joins with `data-slot="input-group-control"`; eight looks |

**Taken:**

- **The parts and behaviour**, with a button part of our own selector (`button[scInputGroupButton]`) on the preset's button.
- **Not the input and textarea parts**: the group shapes `scInput` / `scTextarea` itself, so there is one input, not two.

## Select

A choice among a short list (`div[scSelect]`). A shadcn component: Base UI's Select (local docs) and shadcn's reference app (2026-10-30).

| Library                                                                          | What to read                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base UI Select (`@base-ui/react/docs/react/components/select.md`)                | Parts (Label, Trigger, Value, Icon, Popup, List, Item, ItemText, ItemIndicator, Group, GroupLabel, Separator, ScrollUp/DownArrow); `alignItemWithTrigger` (over the trigger; off by touch, without room); placeholder on the Value; `items` for labels; a name is required; prefer Combobox for large lists |
| shadcn Select on Radix (`shadcn-reference/presets-radix/*/select.tsx`), its docs | Eight looks (Radix's, the user's choice: not the Base UI ones); Radix's `position` (`item-aligned`, `popper`); examples: Align Item With Trigger, Groups, Scrollable, Disabled, Invalid, RTL                                                                                                                |

**Taken:**

- **The parts, the label and the scroll buttons**, as Base UI's; **the list below the trigger, as wide as it** (Radix's `popper`: the user wants the trigger in sight).
- **Not**: the list over the trigger (Base UI's `alignItemWithTrigger`, Radix's `item-aligned` — removed, 2026-11-03: "no more maintenance"), several values (our Multiselect), object values (a string, as Signal Forms binds it), Backdrop and Arrow (shadcn uses neither).

## Pagination

Pages of results (`nav[scPagination]`). A shadcn component, but Base UI and Radix have none, so compared on the web too, at the user's request (2026-11-03).

| Library                                                            | What to read                                                                                                                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Pagination (`shadcn-reference/presets/*/pagination.tsx`)    | Parts (Content, Item, Link, Previous, Next, Ellipsis): plain `a`s with your `href`, `aria-current="page"`, ellipsis `aria-hidden`; text hidden on phones; eight looks                                   |
| [Ark UI Pagination](https://ark-ui.com/docs/components/pagination) | `count`, `pageSize`, `page` (controlled or not), `siblingCount`, `boundaryCount`, `type: 'link'` with `getPageUrl`; context `previousPage`, `nextPage` (null at the ends), `pageRange`, `slice(data)`   |
| [Mantine Pagination](https://mantine.dev/core/pagination/)         | `siblings`, `boundaries`, `withEdges` (first, last); `getItemProps` / `getControlProps` for links; a responsive "Page X of Y" label                                                                     |
| [MUI Pagination](https://mui.com/material-ui/react-pagination/)    | `siblingCount`, `boundaryCount` (1 and 1: `1 … 5 6 7 … 11`, as many items wherever the page is); first/last buttons; router links through `renderItem`; `TablePagination` for rows per page and a range |

**Taken:**

- **shadcn's parts and look**; First, Last and a Status as Ark's and Mantine's.
- **`siblings`, `boundaries`** (all three; Mantine's names, Ark's and MUI's `siblingCount`, `boundaryCount` — renamed by the user, 2026-11-04), with MUI's algorithm: the count of items stays the same as the page moves.
- **`previousPage()`, `nextPage()`, `range()`** (Ark's context and `pageRange`): links' hrefs, "Showing 11–20 of 100".
- **Two-way `[(currentPage)]`, `[(pageSize)]`** (Ark's controlled `page`), as `model()`; `change` stays, the one event for loading a page.
- **Kept in range**: at least one page, the current page never past the last one (MUI and Ark).
- **Links follow their `href`** (shadcn, Ark's link type, Mantine, MUI — and Bootstrap's `?page=` links); a button is `type="button"` unless given a type.
- **Not**: `slice(data)` (`range()` covers it), Mantine's `startValue`, `withPages`, responsive layout; default labels (MUI's "pagination navigation": the text is the consumer's); a page-size part (a Select).

## Table

The native table elements, styled (`table[scTable]`). A shadcn component; Base UI has no table, so shadcn's reference app only (2026-11-04).

| Library                                               | What to read                                                                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Table (`shadcn-reference/presets/*/table.tsx`) | Parts on the native elements; the table wraps itself in a scrolling container; rows highlighted on hover, `has-aria-expanded`, `data-state="selected"`; eight looks |

**Taken:**

- **The parts and each preset's look** (the table's text size, header cell, cell, caption — the rest is the same in every style); the row's `has-aria-expanded` highlight.
- **A frame on the container**: `scFrame` (the user, 2026-11-04; first a `bordered` input) — shadcn's Table has none, its examples hard-code `rounded-md border`, which suits no style but vega and mira. The preset's `frame`: the style's card radius, ring and shadow.
- **The container as a part of its own** (`scTableContainer`): a directive on `table` can't wrap it. Named and focusable when it scrolls (axe's `scrollable-region-focusable`).
- **Not**: the Actions example (a row's menu) and anything a Data Table does — sorting, selection, pages are on its page (the user, 2026-11-04).

## Card

A box of related content (`div[scCard]`). A shadcn component; Base UI has no card, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                         | What to read                                                                                                                   |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| shadcn Card (`shadcn-reference/presets/*/card.tsx`)                                             | Parts (Header, Title, Description, Action, Content, Footer); `size`; `--card-spacing`; eight looks (every part but the action) |
| shadcn's examples (`apps/v4/examples/base/card-*.tsx`, `content/docs/components/base/card.mdx`) | Demo (login), Small, Spacing, Edge to Edge, Image, RTL                                                                         |

**Taken:**

- **The parts, `size` and `--card-spacing`**, each preset's look; the examples, our way (Signal Forms, a local image, the Toggle Group).
- **`ScCardContent`**, shadcn's name (was `ScCardBody`; the user, 2026-11-04 — the library's Body/Content naming is still open).
- **Not**: the old Form, Notification and Stats demos (the user: replaced by better ones; stats are the Stat Card's).

## Badge

A short label (`span[scBadge]`). A shadcn component; Base UI has no badge, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                           | What to read                                                                                   |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| shadcn Badge (`shadcn-reference/presets/*/badge.tsx`)                                             | Six variants in a cva; `data-icon` padding; `render` for a link; eight looks (sera: bare text) |
| shadcn's examples (`apps/v4/examples/base/badge-*.tsx`, `content/docs/components/base/badge.mdx`) | Variants, With Icon, With Spinner, Link, Custom Colors, RTL                                    |

**Taken:**

- **Each preset's cva** (`injectPreset().badge({ variant })`, as the button's); `badgeVariants` left the public API.
- **The examples**, our way: our Spinner (named, a status), the link on `a[scBadge]` with a `routerLink`.
- **The Tags Input's tags follow the preset; the Notification Center's count doesn't** (the user, 2026-11-04): a counter keeps a filled pill — sera's badges are bare text.

## Alert

A callout (`div[scAlert]`). A shadcn component; Base UI and Radix have none, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                           | What to read                                                                                  |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| shadcn Alert (`shadcn-reference/presets/*/alert.tsx`)                                             | Parts (Title, Description, Action); two variants in a cva; `role="alert"` always; eight looks |
| shadcn's examples (`apps/v4/examples/base/alert-*.tsx`, `content/docs/components/base/alert.mdx`) | Basic, Destructive, Action, Custom Colors, RTL                                                |

**Taken:**

- **The parts, the variants and each preset's look.**
- **Not `role="alert"` on every alert** (the user, 2026-11-04): no role by default; the consumer adds `role="status"` or `role="alert"` on a region that is there from the start, when the alert appears after an action. The page's Announcing section and the Announced example say how.

## Alert Dialog

A modal dialog asking for an answer (`div[scAlertDialog]`). A shadcn component: Base UI's Alert Dialog (local docs) and shadcn's reference app and docs' examples (2026-11-04).

| Library                                                                                                                    | What to read                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base UI Alert Dialog (`@base-ui/react/docs/react/components/alert-dialog.md`)                                              | Parts (Trigger, Portal, Backdrop, Viewport, Popup, Title, Description, Close); close reasons: `escape-key`, not an outside press; initial and final focus; handles, payloads, nested dialogs |
| shadcn Alert Dialog (`shadcn-reference/presets/*/alert-dialog.tsx`), examples (`apps/v4/examples/base/alert-dialog-*.tsx`) | Header, Footer, Media, Cancel, Action; `size`; eight looks; Basic, Small, Media, Small with Media, Destructive, RTL                                                                          |

**Taken:**

- **Escape closes it** (Base UI, and the WAI-ARIA pattern) — ours ignored it until 2026-11-04; a click outside still doesn't.
- **shadcn's parts, `size` and each preset's look**, without its placement and animation classes (the CDK overlay, Angular's `animate.enter`/`leave`).
- **Not**: Base UI's handles and payloads (detached triggers), nested dialogs, `initialFocus`/`finalFocus` (the focus trap takes the first button and gives focus back).

## Avatar

A person's picture (`span[scAvatar]`). A shadcn component: Base UI's Avatar (local docs) and shadcn's reference app and docs' examples (2026-11-04).

| Library                                                                                                  | What to read                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base UI Avatar (`@base-ui/react/docs/react/components/avatar.md`)                                        | Root, Image, Fallback; `keepMounted`: the image rendered at once, stacked over the fallback, hidden by `visibility` while `data-loading`/`data-error` — lazy loading and image optimizers work; server rendering; the fallback's `delay` |
| shadcn Avatar (`shadcn-reference/presets/*/avatar.tsx`), examples (`apps/v4/examples/base/avatar-*.tsx`) | Badge, Group, GroupCount; sizes; the outline (`after:`); the same look in every style but the group count's text; Basic, Badge, Badge with Icon, Group, Group Count, Group with Icon, Sizes, Dropdown, RTL                               |

**Taken:**

- **Base UI's loading, as its `keepMounted`** (the user, 2026-11-04): ours hid the image with `display: none` until loaded — a lazy image never loaded — and missed an image loaded before hydration. Now stacked, `visibility`, `data-loading`/`data-error`, `img.complete` checked on start; the state in attributes (hydration).
- **shadcn's parts, outline and examples**; only the group count from the preset.
- **Not**: the fallback's `delay`.

## Aspect Ratio

A box kept to a ratio (`[scAspectRatio]`). A shadcn component; Base UI has none, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                                                    | What to read                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| shadcn Aspect Ratio (`shadcn-reference/presets/*/aspect-ratio.tsx`), examples (`apps/v4/examples/base/aspect-ratio-*.tsx`) | `--ratio` read by `aspect-(--ratio)`, no width of its own, the same in every style; Usage (16 / 9), Square, Portrait, RTL |

**Taken:**

- **The ratio as a CSS variable** (ours was an inline `aspect-ratio`, which no class could change) and **no width of its own** (ours was `w-full`).
- **Not**: a required `ratio` — ours defaults to 1 (the user, 2026-11-04).
- **Ours beside shadcn's examples**: Video, and Responsive (another ratio on a phone, by a class).
- **`scFrame`, not shadcn's examples' `rounded-lg`** (which fits few styles; the user, 2026-11-04): the style's card frame; the aspect ratio always clips (`overflow-hidden`), so the photo takes the frame's corners. Tried and set aside: `scCard` on the same element — it works for a photo (`fill`), but its padding pushes in-flow content (a video), and it borrows a card's meaning.

## Breadcrumb

Where the page is (`nav[scBreadcrumb]`). A shadcn component; Base UI has none, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                                              | What to read                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Breadcrumb (`shadcn-reference/presets/*/breadcrumb.tsx`), examples (`apps/v4/examples/base/breadcrumb-*.tsx`) | Parts; the page as `role="link"` `aria-disabled` `aria-current`; separator and ellipsis hidden; the default chevron turned in RTL; the list, item and ellipsis per style; Basic, Custom separator, Dropdown, Collapsed, Link component, RTL |

**Taken:**

- **The parts and each preset's look** — ours mixed vega's list with nova's item.
- **The separator's icon turned right to left**, whatever the icon (ours has no default; a slash or a dot looks the same turned).
- **Not**: shadcn's default `aria-label="breadcrumb"`, chevron and ellipsis icon, nor its `sr-only` "More" inside the hidden ellipsis — the consumer writes the name and the icons.

## Menu

A menu of actions from a button (`div[scMenuProvider]`; rewritten 2026-11-05, switched in the same day): shadcn's Dropdown Menu. A shadcn component, so no web research: Base UI's docs and shadcn's reference app (2026-11-05).

| Library                                                               | What to read                                                                                                                                                                          |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Dropdown Menu (`shadcn-reference/presets/*/dropdown-menu.tsx`) | Parts (group, label, item, checkbox and radio items, separator, shortcut, submenu); `variant="destructive"`, `inset`; the check at the item's end; eight looks                        |
| Base UI Menu (`@base-ui/react/docs`)                                  | `data-highlighted`, and none after a pointer open; checkbox and radio items stay open on a click; the submenu at the reading end, flipped in RTL; Escape back to the trigger, Tab out |
| `@angular/aria` Menu                                                  | The roles, roving focus, type-ahead and submenu keys we build on; disabled items stay reachable (`softDisabled`)                                                                      |

**Taken:**

- **The parts and each preset's look**, from each style's `dropdown-menu.tsx`, as the `menu` preset key.
- **Base UI's highlight**: `data-highlighted` on the active item, none after a click open until the pointer moves or a key is pressed; the first ArrowDown then shows the first item.
- **Checkbox and radio items that stay open**, `[(checked)]` and the group's `[(value)]`.
- **The menu takes the trigger's direction and language** — no `dir` on the menu.
- **A key that opens a submenu focuses its first item** — Aria tries, but our submenu exists only once its overlay renders, so the item does it then.
- **Not**: shadcn's default check and chevron icons — the consumer writes them.

## Menubar

A row of menus (`[scMenubar]`): shadcn's Menubar. A shadcn component, so no web research: shadcn's reference app and its docs' examples (2026-11-05).

| Library                                                                                                     | What to read                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Menubar (`shadcn-reference/presets/*/menubar.tsx`), examples (`apps/v4/examples/base/menubar-*.tsx`) | The bar and its triggers; menus 8px below, 4px toward the start; its items over the dropdown's, checks at the start; Demo, Checkbox, Radio, Submenu, With Icons, RTL |
| `@angular/aria` MenuBar                                                                                     | The bar's roles and keys we build on; its direction read from the document                                                                                           |

**Taken:**

- **The look of each preset**, as the `menubar` key: the bar, its triggers, and the Menu's parts in a bar (where shadcn's menubar part wraps a dropdown part, its classes merged over it).
- **The same parts as the Menu** — not shadcn's MenubarItem, MenubarCheckboxItem…: a Menu part reads the menu bar's look when it is in one.
- **The placement**, mirrored right to left; **the bar's arrows follow its area's direction**, not only the document's.
- **Not**: shadcn's trigger with no focus style — ours has a focus ring.

## Context Menu

A menu at the pointer (`div[scContextMenu]`): shadcn's Context Menu. A shadcn component, so no web research: shadcn's reference app and its docs' examples, Base UI's docs (2026-11-05).

| Library                                                                                                                    | What to read                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Context Menu (`shadcn-reference/presets/*/context-menu.tsx`), examples (`apps/v4/examples/base/context-menu-*.tsx`) | Its own classes per style (close to the dropdown's); at the pointer's inline end, 4px down; the area's look in the examples; Basic, Submenu, Shortcuts, Groups, Icons, Checkboxes, Radio, Destructive, Sides, RTL |
| Base UI Context Menu                                                                                                       | Nothing highlighted after a pointer open                                                                                                                                                                          |

**Taken:**

- **The look of each preset**, as the `contextMenu` key, read by the Menu's parts in a context menu — not shadcn's ContextMenuItem, ContextMenuCheckboxItem…
- **The highlight**: none after a right-click or a long press; the first item after Shift+F10 or the Menu key.
- **The placement**, and `side` — as `'start'` / `'end'` for shadcn's left / right, so it mirrors right to left.
- **The menu in a portal, as the Menu's** (`ng-template scMenuPortal`, rendered while open), with `side` and `[(open)]` on the root, `div[scContextMenu]` (the name freed by the old part, a `div` whose menu was created with the page; the root was `scContextMenuProvider`).
- **The area is the consumer's**: the trigger part keeps `select-none`, its focus and nothing of the look (it had a dashed box); the demos frame it with `scFrame`, the style's frame, not shadcn's hand-drawn `rounded-xl border border-dashed`.
- **Not**: shadcn's area, which is not focusable — ours is, so the keyboard opens the menu too.

## Tabs

Tabs and their panels (`[scTabs]`; rewritten and switched in 2026-11-05): shadcn's Tabs, Base UI's parts. A shadcn component, so no web research: Base UI's docs, shadcn's reference app and its docs' examples (2026-11-05).

| Library                                                                                            | What to read                                                                                                                        |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Tabs (`shadcn-reference/presets/*/tabs.tsx`), examples (`apps/v4/examples/base/tabs-*.tsx`) | The look per style (list `default` / `line`, trigger, panel); Demo (cards), Line, Vertical, Disabled, Icons, RTL                    |
| Base UI Tabs (`@base-ui/react/docs`)                                                               | The state on the root (`value`, `orientation`); `activateOnFocus` off by default; `loopFocus`; Indicator; `keepMounted`             |
| `@angular/aria` Tabs                                                                               | Roles, roving focus, soft-disabled tabs; a panel renders only through its `ngTabContent` template (a content query, checked in dev) |

**Taken:**

- **Base UI's state**: `[(value)]` and `orientation` on the root only (they were on the list too); `activateOnFocus` (default off) and `wrap` on the list. Aria's `selectionMode` and `focusMode` are not exposed.
- **Each preset's look**, as the `tabs` key.
- **The list's arrows follow its area's direction**, not only the document's.
- **A disabled tab is reached by the arrows**: the tab part removes a native `disabled` (it would take the tab out of focus).
- **Not**: content written straight in a panel, nor Base UI's `keepMounted` — Aria allows a panel's content only in its template, created when shown, destroyed when hidden (tried: a template inside the panel's own view does not satisfy Aria's content query). Documented as a limitation. Not Base UI's Indicator nor `data-activation-direction` (shadcn uses neither).

## Code Block

Code to read and copy (`div[scCodeBlock]`, entry `ui/code-block`): shadcn's Code Block — no Base UI part. Its styles and docs' examples (2026-11-05).

| Library                                                                                                              | What to read                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Code Block (`shadcn-reference/presets/*/code-block.tsx`), examples (`apps/v4/examples/base/code-block-*.tsx`) | The look per style; Basic, Header, Actions, Floating Actions, Line Numbers, Start Line, Wrap, Highlighted Lines, Diff, Height, Show More, Size, Destructive, Tabs, Languages, ANSI, RTL |

**Taken:**

- **Each preset's look**, as the `codeBlock` key (it had nova's only).
- **The examples**, in shadcn's order. Show More is composition, not a part: a max height on the code, your button in the footer (`aria-expanded`).
- **Terminal output** (`language="ansi"`): Shiki's own; its dim text in `--muted-foreground`, not at half opacity.
- **Not**: the integrations (Trace, Message, Chat, Typeset, Markdown, Streaming) — on those components' pages; shadcn's `aria-label="Copy"` default — the copy button's name is yours.

## Dialog

A window over the page (`div[scDialogProvider]`): shadcn's Dialog. Its styles, its docs' examples, and how other libraries close a dialog (2026-11-05).

| Library                                                                                | Close on any button                                                             | The ✕                                                           | Code first (Save)                    |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------ |
| Base UI (`@base-ui/react/docs`)                                                        | `Dialog.Close`, no look                                                         | none: a `Dialog.Close` you place                                | controlled `open` / `onOpenChange`   |
| shadcn (`shadcn-reference/presets/*/dialog.tsx`, `apps/v4/examples/base/dialog-*.tsx`) | `DialogClose` as your button                                                    | built into `DialogContent` (`showCloseButton`), place per style | a submit button, not a `DialogClose` |
| Angular Material (`MatDialogClose`)                                                    | `mat-dialog-close`: behaviour only, no classes, `type="button"`, a result value | none                                                            | `dialogRef.close(result)`            |
| Ark UI                                                                                 | `Dialog.CloseTrigger`, a plain button part                                      | none                                                            | state                                |
| React Aria                                                                             | `<Button slot="close">` or the dialog's `close` function                        | none                                                            | that `close` function                |
| Headless UI                                                                            | `CloseButton`, any element                                                      | none                                                            | `useClose()` or state                |
| Mantine                                                                                | none: `onClose`                                                                 | built in, and `Modal.CloseButton`                               | `onClose` / `opened`                 |

**Taken:**

- **Close is behaviour only**, on any button — all of them (not followed since 2026-11-05, below). `scDialogClose` was the ✕ with its look and place built in (a Cancel with it went to the corner); then it was behaviour only on a `scButton`; since the user's revision (2026-11-05) it is the preset's button again (`variant`, `size`: ghost / icon-sm by default, `variant="outline" size="default"` for Cancel), and the dialog places a close that is its direct child (`data-slot="dialog-close"`) where the preset says — no second part. Unlike the other libraries, the look is ours.
- **Code first closes through the state** (`[(open)]`) — everyone. Not Material's result value: ours live in the template.
- **Each preset's look**, as the `dialog` key (the ✕'s place and fill too: `top-2 end-2` to `top-5 end-5`, `bg-secondary` in luma, sera, rhea).
- **The direction and language of where it is opened**, given to the dialog (rendered at the end of the page).

## Accordion

Items whose panels open and close (`[scAccordion]`; rewritten and switched in 2026-11-05): shadcn's Accordion, Base UI's parts. A shadcn component, so no web research: Base UI's docs, shadcn's reference app and its docs' examples (2026-11-05).

| Library                                                                                                | What to read                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Accordion (`shadcn-reference/presets/*/accordion.tsx`, `apps/v4/examples/base/accordion-*.tsx`) | The look per style (luma frames the whole and tints the open item); two chevrons swapped; Basic, Multiple, Disabled, Borders, Card, RTL                                                                   |
| Base UI Accordion (`@base-ui/react/docs`)                                                              | Root `value` (open items), `multiple` (default false), `disabled`; Item `value`; Header around the Trigger; `keepMounted`, `hiddenUntilFound`; roving focus dropped (APG update)                          |
| `@angular/aria` Accordion                                                                              | Roles, `aria-expanded`/`aria-controls`, arrow keys between triggers; the trigger's `panel` is a **required** input; a panel renders only through `ngAccordionContent` (checked in dev); `preserveContent` |

**Taken:**

- **Base UI's state** on the root: `[(value)]` and `multiple` (one at a time by default — Aria's default is several), the item's `value`; the trigger in a real heading (`h2`–`h6`).
- **Each preset's look**, as the `accordion` key; one chevron turned (`scAccordionTriggerIcon`) for shadcn's two swapped.
- **The panel animates its height both ways**: a transition on height and display (`starting:h-0`, `[[inert]]:h-0`), the content kept after the first opening (Aria's `preserveContent`, set from `@angular/aria/private`).
- **The item connects its trigger and panel** (nothing to wire), though Aria's trigger declares `panel` a required input (every template would have to bind it, `NG8008`): the trigger and panel parts **extend** Aria's directives — the trigger redeclares `panel` as optional — and register with their item as they are created; it sets the panel before Aria's trigger reads it (`ngOnInit`). No official way in angular/components: `[panel]="ref"` is Aria's design since #32855 (it was matching ids before; #32977), Aria is in developer preview. Relies on Aria's classes staying extendable. - **Not** `hiddenUntilFound` (Aria's template). Aria's arrow keys stay (APG and Base UI dropped them).

## Attachment

A file and its upload state (`div[scAttachment]`; restyled 2026-11-05): shadcn's Attachment. A shadcn component, so no web research: shadcn's reference app and its docs' examples (2026-11-05). Base UI has no attachment.

| Library                                                                                                   | What to read                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Attachment (`shadcn-reference/presets/*/attachment.tsx`, `apps/v4/examples/base/attachment-*.tsx`) | The look per style (root and media cvas, the text, actions, group); states, sizes, orientation; image media; a trigger over the card; RTL |

**Taken:**

- **Each preset's look**, as the `attachment` key (`root({ size, orientation })`, `media({ variant })`, the rest as strings).
- **An action part** (`scAttachmentAction`): shadcn's examples put a ghost icon button in the actions; ours styles itself from the preset's button (ghost, icon-xs), `type="button"`.
- **The trigger** on a link or a button (`type="button"`), with `scDialogTrigger` for a dialog — shadcn's examples wrap a link or a dialog trigger.
- **The error's description** in the full destructive colour (shadcn: `/80`, 4.36:1 in dark).

## Bubble

A message's surface (`div[scBubble]`; restyled 2026-11-05): shadcn's Bubble. A shadcn component, so no web research: shadcn's reference app, its docs page and examples (2026-11-05). Base UI has no bubble.

| Library                                                                                             | What to read                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Bubble (`shadcn-reference/presets/*/bubble.tsx`, `apps/v4/examples/base/bubble-*.tsx`, docs) | Only the content and the reactions change per style; 7 variants, align, group, reactions (side, align: end by default), links and buttons (`render`); examples; accessibility (`role="img"`) |

**Taken:**

- **Each preset's look** for what changes, as the `bubble` key (`content`, `reactions`); the variants, alignment and positions stay in the parts.
- **Reactions at the end by default**, `data-side` / `data-align` set, as shadcn's (ours were at the start).
- **Links and buttons**: `scBubbleContent` on a `button` (`type="button"`) or an `a` for shadcn's `render`.
- **The examples**: Variants, Alignment, Group, Links and buttons, Reactions, Show more (our Collapsible: the first paragraph, the rest in its panel, for shadcn's swapped text), Tooltip, Popover, RTL.
- **Not** the Markdown example: no Markdown component; its point (ghost, full width) is in Variants.

## Questionnaire

Questions one at a time (`form[scQuestionnaire]`; built 2026-10-29, restyled 2026-11-05): shadcn's Questionnaire. A shadcn component, so no web research: shadcn's reference app, its headless primitive (`@shadcn/react/questionnaire`), its docs page and 14 examples (2026-11-05).

| Library                                                                                                            | What to read                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Questionnaire (`shadcn-reference/presets/*/questionnaire.tsx`, `apps/v4/examples/base/questionnaire-*.tsx`) | Almost every part's look changes per style; Multiple, Freeform (`QuestionnaireInput` beside choices), Skip, Shortcuts, Validation (Zod), Controlled, Resume, Conditional (disabled items), Navigation state, Custom progress, Animated, Card, Dialog |

**Taken:**

- **Each preset's look**, as the `questionnaire` key (13 strings); `data-checked` / `data-disabled` read as `:has(>input:checked / :disabled)`, the check icon (yours) as `[&>svg]:`.
- **The examples**, the Angular way: Validation is a validator in the schema (Submit goes back to the question left wrong); Conditional an `@if` with `required(…, { when })`; Navigation state reads `active()?.answered()`; Resume sets the model and `item`; Custom progress draws steps inside the part; Animated a `starting:` transition; Card names each question with `aria-labelledby`.
- **Not** `QuestionnaireInput` beside choices: free answers stay your `scInput` / `scTextarea` (one field can't hold a choice and free text). Freeform is a question answered in words.

## Control Group

An input or a select joined with its buttons (`div[scControlGroup]`): shadcn's Button Group, renamed for what it is for (the user, 2026-10-30: it is only useful when inputs or selects mix with buttons; buttons alone are on the Button page). A shadcn component, so no web research: Base UI and shadcn's reference app (2026-10-30).

| Library                                                                   | What to read                                                                                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Button Group (`shadcn-reference/presets/*/button-group.tsx`, docs) | `div role="group"`, named by `aria-label`; Tab to each button; text (`render` as a label) and a separator (its Separator); eight looks   |
| Base UI (`@base-ui/react/docs`)                                           | No button group. Its Toolbar is the other model — one tab stop, arrow keys between items — and its Toggle Group, for buttons that toggle |

**Taken:**

- **shadcn's model**: a plain group, Tab to each button — not Base UI's Toolbar (arrow keys), which is a component of its own. The page says when to use a Toggle Group or a Toolbar instead, as shadcn's "ButtonGroup vs ToggleGroup".
- **Each preset's look**, from its own `button-group.tsx`; the text on a `label` too, for shadcn's `render={<Label />}`.

## Tree Table

Tree rows in the Data Table (`ui/data-table`), the user's choice over a
component of its own: TanStack's expanding feature builds the tree, our parts
show it.

| Library                                                                             | What to read                                                                                         |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [WAI-ARIA treegrid](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/)             | The keyboard and the row attributes (`aria-level`, `aria-posinset`, `aria-setsize`, `aria-expanded`) |
| [TanStack Table: expanding](https://tanstack.com/table/latest/docs/guide/expanding) | `getSubRows`, `filterFromLeafRows`, `paginateExpandedRows`; its examples' checkbox states            |
| AG Grid, MUI X Data Grid ("tree data")                                              | The same idea as ours: a mode of the grid, the first column grouping                                 |

**Taken:**

- **The name "Tree Table"** (the user's choice); parts keep the Data
  Table's prefix (`scDataTableTreeGrid`, `scDataTableExpand`…).
- **The full treegrid keyboard** (the user's choice): rows are one tab stop;
  ↑/↓, → open or go in, ← close or go up (mirrored in RTL), Home/End, Enter,
  Space selects.
- **A parent half-ticked** while only some of its children are selected,
  selected itself or not — as TanStack's examples.

**Open — to follow them later:**

- **Children loaded on opening**: a row's children fetched when it opens.
- **Cell focus** inside a row (the treegrid pattern's cell navigation): rows
  only, for now.

## Gantt

Researched 2026-10-29 (weekly npm downloads, Gantt-specific libraries;
Mermaid and Highcharts draw Gantts among many charts and are left aside).

| Library                                                           | Weekly | What to read                                                                                                                                      |
| ----------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frappe Gantt](https://github.com/frappe/gantt)                   | 277k   | Task `{ id, name, start, end, progress, dependencies }`; view modes Day/Week/Month/Year; drag, resize and progress with `snap_at`; `readonly*`    |
| [SVAR Gantt](https://docs.svar.dev/react/gantt/overview)          | 126k   | Task, summary and milestone; four link types; the task grid beside the chart (tree, sorting); zoom by scales; weekends and holidays; hotkeys      |
| [gantt-task-react](https://github.com/MaTeMaTuK/gantt-task-react) | 67k    | `task` / `milestone` / `project` (collapsible); `onDateChange` / `onProgressChange` that can refuse the change; RTL                               |
| dhtmlx-gantt                                                      | 52k    | The classic feature set (the free edition is GPL)                                                                                                 |
| [Kibo UI Gantt](https://www.kibo-ui.com/components/gantt)         | —      | shadcn-style parts: provider, sidebar, timeline, feature rows, markers, today; `range` daily/monthly/quarterly + `zoom`; no keyboard for its bars |
| @worktile/gantt                                                   | 8k     | The Angular one: day to year views, groups, children, links, drag                                                                                 |

None documents an accessible Gantt: no ARIA pattern exists for one, and
none gives the bars a keyboard (Kibo's drag is mouse only).

**Taken** (built 2026-10-29, `@semantic-components/ui/gantt`):

- **A timeline column for the Data Table**, its own entry (the user's
  choice): the task list is the tree grid, as SVAR's grid beside the chart.
- **Frappe's task** (`start`, `end`, `progress`, `dependencies`) and
  snapping a day at a time; **SVAR's** task, summary and milestone;
  **gantt-task-react's** changes the app may refuse (here: proposals,
  `dateChange` / `progressChange`).
- **Kibo's** parts and markers; its `range` became `scale` (day, week, month).
- **Ours**: Alt+arrows on a row, dates read out and announced.

**Open — to follow them later:** link types other than finish-to-start,
moving the followers, drawing links or tasks by drag.

| Library                                      | What to read                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vidstack](https://vidstack.io)              | The default layout ([docs](https://vidstack.io/docs/player/components/layouts/default-layout/), [source](https://github.com/vidstack/player/blob/main/packages/vidstack/src/elements/define/layouts/default/video-layout.ts)); when the controls show and hide ([source](https://github.com/vidstack/player/blob/main/packages/vidstack/src/core/controls.ts)) |
| [Media Chrome](https://www.media-chrome.org) | [Responsive controls](https://www.media-chrome.org/docs/en/responsive-controls); [autohide](https://www.media-chrome.org/docs/en/components/media-controller)                                                                                                                                                                                                  |

**Taken:**

- **A small layout below 576px of the player's width** (Vidstack's breakpoint; Tailwind's `@xl` container size): captions at the top (`scVideoPlayerTop`), play in the middle (`scVideoPlayerCenter`), time, title and fullscreen at the bottom (`scVideoPlayerBar`), the seek bar at the bottom edge. Out of it: the skips, mute, the volume slider, the speeds, picture-in-picture. The parts do it themselves (`@container/video`), not the template.
- **Before the first play** (Vidstack's start duration): the poster, play and the length only (`scVideoPlayerStartDuration`); the controls from the first play on.
- **The controls hide only while playing,** after a rest; paused, they stay (both).
- **On a touch screen, a tap on the playing video shows or hides the controls** — it doesn't pause (Vidstack, and the phones' own players).
- **Ended: Replay** in place of Play.

**Open — to follow them later:**

- **A settings menu** (Vidstack's, top bar of the small layout): the speeds — and captions, quality — in a menu, so a small player keeps them.
- **Volume as a pop-up** on the mute button (Vidstack), instead of a slider in the bar.
- **The hide delay: 2 s** (both); ours is 2.5 s.
- **Keep the controls while the pointer rests on them** (Media Chrome: not hidden while hovered); ours hide unless one has focus.
- **Hide when the pointer leaves the player** — an option in Vidstack (`hideOnMouseLeave`, off by default).
- **A medium layout** (Media Chrome, 420–590px): the center controls and the bar together.
