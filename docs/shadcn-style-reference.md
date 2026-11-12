# Finding shadcn Styles

How to find shadcn/ui's styles and compare them with ours. Rewritten 2026-11-04: the reference is now a generated app, one per style, and our looks live in presets.

## The reference: a generated app per style

Not shadcn's GitHub source, not its website: **`D:/Workspace/Projects/shadcn-reference`** ([klagrida/shadcn-reference](https://github.com/klagrida/shadcn-reference)), made with shadcn's own CLI.

| Folder                   | What                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `presets/<style>/`       | One app per style — nova, vega, maia, lyra, mira, luma, sera, rhea — on **Base UI** |
| `presets-radix/<style>/` | The same on **Radix**, for the components whose Radix look we follow (the Select)   |

In each app, `src/components/ui/*.tsx` holds every component with its **classes written out in full**: the CLI has resolved shadcn's `cn-*` names (in its source, the looks live in `registry/styles/style-*.css`) into plain Tailwind classes. So:

- **Read the `.tsx`**, class for class — no theme CSS to look up.
- **One style against another** is a diff of two files (`diff presets/nova/… presets/maia/…`).
- **The classes are already RTL-ready**: the CLI ran with `--rtl`, so they are logical (`ms-*`, `pe-*`, `start-*`, `text-start`) with `rtl:` variants where needed (`rtl:translate-x-1/2`, `rtl:rotate-180`) — compare them with ours as they are.
- The theme (colors, radius): `src/styles.css`.

Regenerate with its `setup.sh` (`sh setup.sh`, `sh setup.sh vega maia`, `BASE=radix sh setup.sh`), or refresh one app inside it with `npx shadcn@latest add --all -y -o` and read the `git diff`.

shadcn's docs and **examples** are still on GitHub — `apps/v4/content/docs/components/base/<name>.mdx` (the page: which examples, in what order) and `apps/v4/examples/base/<name>-*.tsx` (each example):

```bash
gh api repos/shadcn-ui/ui/contents/apps/v4/examples/base/card-image.tsx --jq '.content' | base64 -d
gh api repos/shadcn-ui/ui/contents/apps/v4/examples/base --jq '.[].name' | grep '^card'
```

For a component's parts and behaviour, Base UI's own docs are in the reference app's `node_modules`: `presets/nova/node_modules/@base-ui/react/docs/react/components/<name>.md`.

## Where our looks live: presets

shadcn's eight styles are our **presets** (`@semantic-components/presets`), one chosen when the app starts (`provideSemanticComponents({ preset })`, nova by default).

- **`libs/presets/<style>/src/<component>.ts`** — the classes of a component that change from style to style, one file per component per style, each generated from that style's `.tsx` in the reference app (the source in its header comment). A `cva` where shadcn has one (`button`, `badge`, `alert`), strings otherwise.
- **`libs/presets/src/index.ts`** — the `ScPreset` interface: every key (`button`, `card`, `table`, `alertDialog`, `backdrop`, `avatarGroupCount`…).
- **The part reads its preset**: `injectPreset().card`, then `cn(this.styles.title, this.classInput())`. Classes that are the same in every style stay in the part.

So when a component's turn comes:

1. Diff its `.tsx` across the eight styles: what differs goes into the preset, what's the same stays in the part.
2. Write the preset files from the `.tsx` with a small script (one per component, kept out of the repo) — never by hand — so each class is shadcn's exactly.
3. Leave out what our machinery does instead (below), and say so in the preset file's comment.
4. A presets spec checks every style's classes on the rendered part (`apps/showcase-e2e/src/demos/<name>/<name>-presets.spec.ts`).

## RTL: what must stay physical

The reference's classes are logical already; so are ours. A physical class in our code (`pr-*`, `left-*`, `text-right`) is a bug — the repo is RTL-first — with four exceptions, kept physical on purpose:

**1. Centring: `left-1/2` paired with `-translate-x-1/2`.** `translate-x` has no logical form, so changing only the inset moves the element off-centre in RTL. shadcn's output keeps the inset logical and adds `rtl:translate-x-1/2`; if you convert the inset, do both. Affects tooltip, radio, the resizable handle and toast-stack's centre positions.

**2. Explicitly physical APIs.** Where a component takes a side by name — `side="left"`, `swipeDirection="left"`, `'top-right'` — the caller means literally left. Affects drawer, sheet, sidebar and toast-stack.

**3. Spatial widgets.** Image cropper, image compare, image annotator and org-chart: handle offsets pair with physical resize cursors (`w-resize`), and mirroring a crop box or a diagram is wrong whatever the writing direction.

**4. Anything an overlay is coupled to.** The media progress fills are positioned over a slider; flipping one without the other's thumb math would desync them.

The test: is the edge _the trailing one_ (flip it) or _a specific physical side_ (leave it)?

For background, shadcn's mapping table is `packages/shadcn/src/utils/transformers/transform-rtl.ts` (`pl-` → `ps-`, `space-x-*` → `rtl:space-x-reverse`, `cn-rtl-flip` → `rtl:rotate-180`…).

## Deliberate divergences

Do **not** "fix" these to match shadcn:

- **The theme is each app's** (`apps/*/src/styles.css`), not the library's: shadcn's colors exactly, from the reference app, plus our `--success` / `--warning` (the toast's). `--muted-foreground` is darker (`oklch(0.51 0 0)`) and `--destructive` too (`oklch(0.52 0.245 27.325)`), for 4.5:1 contrast.
- **Contrast over opacity** — where shadcn dims text with opacity (`opacity-60`, `text-muted-foreground/70`), we keep `text-muted-foreground` so the text keeps 4.5:1, and dim only what isn't text (Trace: a pending line's icon).
- **Placement and open/close animation are Angular's and the CDK's** — shadcn's `fixed top-1/2 start-1/2 -translate-*` (placement) and `data-open:` / `data-closed:` classes (animation) are left out of the presets: the CDK overlay places (centres a dialog; a select's list from its `positionChange`), Angular's `animate.enter` / `animate.leave` animate. Alert Dialog, Select. **A dialog's width** (2026-11-11): shadcn's `w-full` fills a fixed, screen-wide box; the CDK's pane is only as wide as its content, so `scDialog` and `scAlertDialog` add `w-screen` (after the preset, before your classes) and the preset's `max-w` caps it — a dialog with short content is as wide as shadcn's, and doesn't collapse while zooming in.
- **A modal's scroll lock is the CDK's: the page's scrollbar stays** (the user, 2026-11-06: follow the CDK; the difference is only styling) — Base UI hides it while a modal is open (`useScrollLock`: `overflow: hidden` on the page's scroller, `scrollbar-gutter: stable` on `html` so nothing shifts). Our modals (Dialog, Alert Dialog, Sheet, Drawer) use the CDK's `block()` strategy: `html.cdk-global-scrollblock` is `position: fixed; width: 100%; overflow-y: scroll`, so the scrollbar stays, inactive, beside the panel. An app that wants it hidden can override that class in its styles (`overflow-y: hidden; scrollbar-gutter: stable`).
- **One backdrop for every overlay** — shadcn's overlay is the same in Alert Dialog, Dialog, Sheet and Drawer for a style, so it is one preset key (`backdrop`), read by the shared `scBackdrop` itself.
- **Button: `aria-disabled` styled too** — `scButton` sets `aria-disabled` with `disabled`, so its preset adds `aria-disabled:pointer-events-none aria-disabled:opacity-50` beside shadcn's `disabled:` ones (`libs/presets/*/src/button.ts`).
- **Link: a link by default, button looks as variants** (the user, 2026-11-11) — shadcn has no link component: a link that looks like a button is an `<a>` given `buttonVariants()`, and `link` is one of the Button's variants. Our `a[scLink]` is a link by default (`variant="default"`, the button preset's `link` look), and a button's look is a variant: `button` (the primary one, shadcn's `default`), `outline`, `secondary`, `ghost`, `destructive` (`LINK_TO_BUTTON` in `link.ts`). `scButton` keeps shadcn's variants, `link` included.
- **Input Group: no InputGroupInput or InputGroupTextarea** — ours are plain `scInput` / `scTextarea` (and any control with `data-slot="control"`); the group gives them those classes (`[&>input[data-slot=control]]:…`), from each preset's InputGroupInput / InputGroupTextarea. shadcn's `data-slot="input-group-control"` is our `control`. The group also rings for a focused date/time segment or a select, multiselect or combobox trigger.
- **Control Group (shadcn's Button Group): its name, children by position** — named for what it is for, an input or a select joined with its buttons. Its children are found by position (`[&>*:not(:last-child)]`), not by `data-slot`; where luma, rhea and sera read `[data-variant=outline]` on a child, ours read `[data-slot=button]` (our buttons carry no `data-variant`).
- **Select: Radix's styles, not Base UI's** (the user's choice, 2026-10-30), from `presets-radix/<style>/select.tsx`, **built the Angular way**: the highlighted item reads `data-[active=true]:` for `focus:` and `aria-disabled:` for `data-disabled:`; nothing of Radix's machinery is recreated (its `--radix-select-*` variables dropped — the CDK sets the transform origin, the height and the width). The root sets the width, the trigger fills it, the list matches it.
- **Table: the container is a part, and can be framed** — shadcn's Table wraps itself in its scrolling div; a directive on `table` can't, so `scTableContainer` is the consumer's. A frame round it is `scFrame` (below).
- **`scFrame`: one frame for framed boxes** (the user, 2026-11-04) — shadcn's examples hard-code a frame (`rounded-md border`, `rounded-lg`) that suits few styles; ours is a directive, `scFrame`, drawing the preset's `frame` — the style's card radius, ring and shadow — round any box: an aspect ratio, a table's container. Only the look: clipping is the box's (the aspect ratio clips, the table's container scrolls). Other hand-drawn frames move to it case by case, in each component's turn. The Card draws its own frame from the same key (its `card` preset holds the rest), so the card's frame is in one place.
- **Alert: no `role="alert"`** — shadcn's always has it; ours has none, and the consumer announces one that appears (`role="status"` or `role="alert"` on a wrapper — the Alert page's Announcing section).
- **Avatar: Base UI's image loading** — the image rendered at once over its fallback, hidden by `visibility` while `data-loading` / `data-error` (shadcn's preloads, then swaps). The group count is the only preset key: shadcn's avatar is the same in every style but for it.
- **Notification Center's count: its own pill** — it doesn't take the badge's preset (sera's badges are bare text): a counter keeps a filled pill in every style.
- **Menu (shadcn's Dropdown Menu): `data-highlighted:` for `focus:`** — an item is highlighted when Aria makes it active, not when it has focus (after a click open none is), so the presets read `data-highlighted:` for `focus:`, `aria-disabled:` for `data-disabled:`, `aria-expanded:` for `data-popup-open:` (a submenu's item), `group/menu-item` for `group/dropdown-menu-item`. Placement and animation classes are left out (above). A submenu sits 4px from its menu's edge in every style and direction, its first row level with the item that opens it (the user, 2026-11-05) — shadcn places it against its item (`sideOffset={0}`, `alignOffset={-3}`), so its gap and its height follow each style's padding.
- **Menubar: the Menu's parts, a focus ring** — no MenubarItem, MenubarCheckboxItem…: the Menu's parts take the preset's `menubar.menu` look inside a bar (shadcn's menubar classes merged over its dropdown ones, as its parts wrap them). Its triggers add `focus-visible:outline-2 focus-visible:outline-ring`: shadcn's have none (`outline-hidden`).
- **Context Menu: the Menu's parts, a focusable area** — no ContextMenuItem…: the Menu's parts take the preset's `contextMenu` look in a context menu. Its area (`scContextMenuTrigger`) is focusable — Shift+F10 and the Menu key open the menu — so it adds `focus-visible:ring-3 focus-visible:ring-ring/50`; shadcn's has `select-none` only. `side` is logical (`start` / `end`).
- **Tabs: our states** — `aria-selected:` for `data-active:`, and the root's `data-[orientation=…]` for `data-horizontal:` / `data-vertical:` (`libs/presets/*/src/tabs.ts`). A hidden panel is `inert`, so the part adds `[[inert]]:hidden`.
- **Code Block: terminal dim text readable** — Shiki draws ANSI dim at half opacity (`#rrggbb80`); our highlighter gives it `--muted-foreground` (contrast over opacity, above). A code editor in the block takes the preset's focus classes for the code (`has-[>[data-slot=code-editor]:focus-within]`).
- **Dialog: the ✕ is in your markup, placed by the dialog** — shadcn's `DialogContent` draws its ✕; ours is your button with `scDialogClose` (the preset's button, ghost / icon-sm), put in the corner by the dialog (the preset's `close`, as `[&>[data-slot=dialog-close]]:` classes).
- **Code: GitHub dark default, not GitHub dark** — the dark theme's comments (`#6a737d`) are 3.79:1 on the code's background; GitHub's default dark (`#8b949e`) keeps 4.5:1. Light stays GitHub's high-contrast theme. The Code Editor's palette follows.
- **Accordion: one chevron, a focus ring everywhere, a height transition** — shadcn swaps two icons (down, up); ours turns one (`scAccordionTriggerIcon`). The trigger has a focus ring in every style (luma's has none). shadcn's panel animates with `data-open:animate-accordion-down` and a height variable; ours transitions its height (`starting:h-0`, `[[inert]]:h-0`, `interpolate-size`).
- **Attachment: an action part, the error readable** — shadcn's examples put a plain `Button` in `AttachmentActions`; ours is `scAttachmentAction` (the preset's button, ghost / icon-xs). An error's description is `text-destructive`, not shadcn's `text-destructive/80` (4.36:1 in dark; contrast over opacity, above).
- **Bubble: content on your element** — shadcn's `BubbleContent` takes `render` for a button or a link; ours is a directive on a `div`, a `button` (given `type="button"`) or an `a`. Show more puts the rest of the text in our Collapsible's panel, where shadcn swaps a truncated string.
- **Questionnaire: state from the input** — shadcn's choice reads `data-checked` / `data-disabled` from its primitive; ours read the native input (`has-[>input:checked]`, `group-has-[>input:checked]/questionnaire-choice`). The check icon is yours, so its classes are `[&>svg]:` on the indicator; the shortcut's `hidden` / `group-data-[shortcut]` is the part's `[hidden]`.
- **Trace: the output at the lines' size** — shadcn's collapsible content inherits the page's text size; ours takes the line's (`text-sm`, `text-xs` in lyra, `text-xs/relaxed` in mira). The chevron is yours (`scTraceCollapsibleIcon`), turned and mirrored in RTL; shadcn's trigger draws its own.
- **Marker: a button host, its hover the part's** — shadcn's `Marker` takes `render` for a link or a button, the button's hover written by the consumer (`transition-colors hover:text-foreground`); ours is a directive on a `div`, an `a` or a `button`, adding `[a,button]:transition-colors [a,button]:hover:text-foreground` itself.
- **Message: actions named in sr-only text** — shadcn's examples name icon-only actions with `aria-label` (and `title`); ours with an sr-only span (our rule for icon buttons).
- **Item: our slots, no list role** — the presets' `in-data-[slot=dropdown-menu-content]` is `in-data-[slot=menu]` (our menu), `[data-slot=item-content]` is `item-body` (our ScItemBody). shadcn's group has `role="list"`; ours leaves it to the consumer.
- **Drawer: the look only in the preset** — shadcn's popup carries Base UI's swipe and stack variables (`--drawer-swipe-movement-*`, `--stack-*`, `--closed-transform`); the `drawer` key keeps only its look (colours, corners and borders by `data-swipe-direction` — physical `rounded-r` / `rounded-l` for left / right, as a swipe direction is physical — the inset, the handle's `after:` bar). The part moves the panel; the drawer behind a nested one scales to 95% and dims (shadcn's also peeks and hides its content). A side drawer's handle sits over its free edge (shadcn's popup turns into a row).
- **Preview Card: shadcn's Hover Card, Base UI's name; one card per trigger, the CDK places it** — named for what it is, a preview of a link's destination (keyboard focus opens it too, a touch doesn't); the `previewCard` key is shadcn's popup without its `data-open:` / `data-closed:` classes (Angular's `animate.enter` / `animate.leave`); `origin-(--transform-origin)` stays but nothing sets the variable (the CDK places it). Base UI's detached triggers, Viewport and Arrow aren't taken.
- **Skeleton: still with reduced motion** — the part adds `motion-reduce:animate-none` to the preset's `skeleton` (shadcn's keeps pulsing).
- **Resizable: the grip a part, the handle's orientation plain classes** — the `resizable` key holds the grip (`withHandle`'s div, `rounded-none` in lyra and sera); the handle's `aria-[orientation=…]:` classes are chosen in the part (they would outrank the consumer's), its hit area logical as shadcn's.
- **Calendar: no caption dropdowns; our cells** — shadcn's `captionLayout="dropdown"` is not taken: the heading is a button that zooms out to months and years (the user: dropdowns are hard to use). The cells are our `td`s (one Tab stop, a grid), styled from the preset's `--cell-size` / `--cell-radius`; shadcn's react-day-picker `classNames` and `CalendarDayButton` aren't copied class for class.
- **Label: one part for Label and FieldLabel; `has-checked:`** — the `label` key's `field` classes are added in or around a field; shadcn's `has-data-checked:` (Base UI's attribute) is `has-checked:` (our native inputs).
- **Field: our slot names; a select in a field** — the `field` key's strings use `field-body` (shadcn's `field-content`), `label` (`field-label`) and `data-[orientation=horizontal]` (`data-horizontal`). A select in a field is `contents`, its label the field's look; shadcn's FieldLabel goes beside a SelectTrigger.
- **Radio Group: a native radio** — the `radioGroup` key's `item` reads `checked:` (Base UI's `data-checked:` / `aria-checked:`); its `dot` is the input's `::before` (`checked:before:…`), shadcn's an indicator span.
- **Checkbox: a native checkbox** — the `checkbox` key's `item` reads `:checked` and `:indeterminate` (Base UI's `data-checked:`); its `mark` is the input's `::before`, the style's icon as a mask (`--sc-checkbox-check` / `--sc-checkbox-indeterminate` first), shadcn's an indicator span with an icon. Indeterminate is filled, with a minus: shadcn's Base UI checkbox draws only a check.
- **Switch: a native checkbox; square in lyra** — the `switch` key's `track` is the input (`:checked`, `:not(:checked)`, `:disabled` for Base UI's `data-checked:`, `data-unchecked:`, `data-disabled:`), its `thumb` the input's `::before` (the thumb's `group-data-[size=…]/switch:` as the input's own `data-[size=…]:`). **Lyra's switch is sera's**, square, not shadcn's: shadcn's lyra switch is nova's, round, beside lyra's square checkbox, cards and fields (the user, 2026-11-10). Sera's is shadcn's own square switch — its sizes nova's adjusted (18×33, 14×25 small), the thumb inset 1px on every side, off and on; lyra keeps only its own focus ring (`ring-1`, `ring/50`; sera's `ring-2`, `ring/30`). Making nova's round switch square by hand (the thumb filling the track) read as a box split in two. The generator (`gen-switch.cjs`) reads sera's `switch.tsx` for lyra — keep it when regenerating.
- **Pagination: parts on buttons or your links** — the parts set no `href`: a link follows the one you give it.
- **Alert: `success` and `warning` variants** (the user, 2026-11-11) — shadcn's has `default` and `destructive` only; ours adds the Toast's colours, each style's `destructive` string with `--success` / `--warning` and the description in the full colour (4.5:1, no `/90`).
- **Toast: our toaster, shadcn's look** — the `toast` key is the toast's look only (`border bg-popover … shadow-lg` and the style's corners); shadcn's root classes for the stack (`--toast-index`, `--toast-offset-y`, swipe and `data-ending-style` transforms) are Base UI's machinery, not taken: our stack places the toasts (shadcn's 12px peek and gap, 10% smaller each), Angular's `animate.enter` / `animate.leave` animate them. Six positions, not shadcn's bottom end only. Its variants colour the title, description and icon (`success`, `warning`, `error`; `info` neutral), the Alert's way (the user, 2026-11-11): shadcn's toast colours only its error icon.
- **Combobox and Command: the list's scrollbar shows** (the user, 2026-11-11: "take the default from Base UI, maybe shadcn did a wrong choice here") — shadcn's lists carry `no-scrollbar`; Base UI's Combobox examples scroll with the native scrollbar, its command palette with a visible Scroll Area. Ours show a thin scrollbar (`[scrollbar-width:thin]`); `hideScrollbar` on the list gives shadcn's look. `no-scrollbar` is left out of the `combobox` and `command` presets' `list` (the generators filter it). The Sidebar Next's content too (2026-11-12, the same choice); the Select has its scroll buttons.
- **Decomposition** — shadcn ships one function per part in one file; we split into directives, one per file, so one shadcn part can map to several of ours.

See also [component-design-principles.md](component-design-principles.md), [data-slot-pattern.md](data-slot-pattern.md) and [reference-libraries.md](reference-libraries.md) (what each component took from where).
