# Emoji Picker

An emoji picker assembled from parts, modelled on [Frimousse](https://frimousse.liveblocks.io) (the React picker shadcn/ui's emoji picker is built on):

- **One scrolling list** of every category, with sticky headers, **virtualised**: only the rows in view are drawn.
- **Keyboard first**: typing filters, the arrow keys move an active emoji from the search field (focus stays there) and Enter picks it; the active emoji is announced to screen readers and can be previewed.
- **Skin tones**, applied to the whole list.
- **28 languages**: the emojis' names and the search come from [Emojibase](https://emojibase.dev) in `LOCALE_ID` (the app's, or one provided for a section).
- **No ▯ boxes**: emojis newer than the system can draw are left out.
- Category navigation and recently used emojis, if you want them.

You write the markup and every piece of text — placeholders, labels, empty and loading states, category icons; the parts add the behaviour, the ARIA wiring and the default (shadcn) styles.

## Usage

```html
<div scEmojiPicker (emojiSelect)="pick($event)">
  <div scEmojiPickerSearchField>
    <svg siSearchIcon></svg>
    <input scEmojiPickerSearch placeholder="Search…" aria-label="Search emojis" />
  </div>
  <div scEmojiPickerViewport>
    <span scEmojiPickerLoading><svg scSpinner siLoaderCircleIcon aria-label="Loading emojis"></svg></span>
    <span scEmojiPickerEmpty>No emoji found.</span>
    <span scEmojiPickerError>Couldn't load the emojis.</span>
    <span scEmojiPickerAnnouncer></span>
    <div scEmojiPickerList aria-label="Emojis"></div>
  </div>
  <div scEmojiPickerFooter>
    <div scEmojiPickerPreview>Select an emoji…</div>
    <button scEmojiPickerSkinTone #tone="scEmojiPickerSkinTone">
      {{ tone.variation() }}
      <span class="sr-only">Change skin tone</span>
    </button>
  </div>
</div>
```

The list draws the emojis itself — the categories with their headers, and only the rows in view: they hold nothing but the data (the emojis, their names, the categories' names), so there's nothing of yours to write in them.

In a popover, put it in a `scPopover` (with `p-0`) opened by your `scButton`: the search field takes focus, and a pick closes the popover (`closeOnPick`; `[closeOnPick]="false"` keeps it open for more). With `[insertInto]="field"` (your `input` or `textarea`), a pick goes into the field at its caret, its value follows (an `input` event: a `[formField]` updates), and focus is back in it, after the emoji.

## Parts

| Part                          | Selector                                         | Does                                                                                                                                                                                                                                                                         |
| ----------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScEmojiPicker`               | `div[scEmojiPicker]`                             | The picker (`exportAs: 'scEmojiPicker'`). Arrow keys / Enter while focus is in the search field or the list.                                                                                                                                                                 |
| `ScEmojiPickerSearchField`    | `div[scEmojiPickerSearchField]`                  | The search row: your icon, then the field.                                                                                                                                                                                                                                   |
| `ScEmojiPickerSearch`         | `input[scEmojiPickerSearch]`                     | Filters as you type (by name, then keywords); the first result becomes active.                                                                                                                                                                                               |
| `ScEmojiPickerViewport`       | `div[scEmojiPickerViewport]`                     | The scrolling frame (focusable: the arrows work from it too).                                                                                                                                                                                                                |
| `ScEmojiPickerList`           | `div[scEmojiPickerList]`                         | The grid (`role="grid"`): draws the emojis — only the rows in view (`role="row"`, `gridcell` buttons named by their labels, `data-active` on the active one) — under their categories, whose headers stick (`[sticky]="false"` on the picker: not). Give it an `aria-label`. |
| `ScEmojiPickerLoading`        | `[scEmojiPickerLoading]`                         | Shown while the data loads.                                                                                                                                                                                                                                                  |
| `ScEmojiPickerEmpty`          | `[scEmojiPickerEmpty]`                           | Shown when nothing matches (`exportAs: 'scEmojiPickerEmpty'`, `search()` for your text).                                                                                                                                                                                     |
| `ScEmojiPickerError`          | `[scEmojiPickerError]`                           | Shown (`role="alert"`) when the data couldn't be loaded.                                                                                                                                                                                                                     |
| `ScEmojiPickerAnnouncer`      | `[scEmojiPickerAnnouncer]`                       | Visually hidden live region: says the emoji moved to with the keyboard (focus stays in the search field).                                                                                                                                                                    |
| `ScEmojiPickerFooter`         | `div[scEmojiPickerFooter]`                       | A row under the list, as wide as it.                                                                                                                                                                                                                                         |
| `ScEmojiPickerPreview`        | `div[scEmojiPickerPreview]`                      | In the footer: the emoji hovered or moved to with the keyboard, and its name — or, while there's none, your text (`Select an emoji…`).                                                                                                                                       |
| `ScEmojiPickerSkinTone`       | `button[scEmojiPickerSkinTone]`                  | Cycles the skin tone; `variation()` is its emoji (`✋`, or yours: `scEmojiPickerSkinTone="👍"`) in the current tone. Give it a name (`picker.skinToneNames()`). The style's button: `variant` (`ghost`), `size` (`icon-sm`).                                                 |
| `ScEmojiPickerCategoryNav`    | `div[scEmojiPickerCategoryNav]`                  | A toolbar of category buttons (one Tab stop, arrow keys). Give it an `aria-label`.                                                                                                                                                                                           |
| `ScEmojiPickerCategoryButton` | `button[scEmojiPickerCategoryButton]="category"` | Scrolls to the category (`picker.categories()`); `aria-pressed` on the one at the top. Write its icon — `category.key` (`smileys-emotion`, `people-body`… `recent`) to choose. The style's toggle: `variant` (`default`), `size` (`sm`).                                     |

## `scEmojiPicker`

- **Inputs**: `columns` (`10`), `emojiVersion` (the newest Emoji version to show; by default the newest the system draws), `data` (your own `ScEmojiData` instead), `sticky` (`true`), `maxRecent` (`20`), `recentLabel` (the name of a first category of the recent emojis — none without it), `closeOnPick` (`true`: in a popover, a pick closes it), `insertInto` (your `input` or `textarea`: a pick goes in at its caret).
- **Two-way**: `skinTone` (`'none' | 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark'`), `recent` (`ScEmoji[]`, latest first — keep it to restore it).
- **Output**: `emojiSelect` (`{ emoji, label }`).
- **State for your text**: `loading()`, `failed()`, `empty()`, `search()`, `activeEmoji()`, `categories()`, `currentCategory()`, `skinToneNames()`.
- **Methods**: `focus()`, `scrollToCategory(index)`, `nextSkinTone()`, `skinToneVariations(emoji)`.

## Data

Emojibase's `data.json` and `messages.json` for the locale come from the `emojibase-data` package, bundled with your app: each locale is a chunk of its own (one dynamic import per file, which the bundler splits), downloaded the first time a picker shows it and cached by the browser with the rest of your app. No CDN — nothing to host, nothing fetched from another origin, and the data your app was built and tested with; a new Emojibase comes with an upgrade of the package. The emojis are then filtered to what the system draws (country flags too — Windows has none). `loadEmojiData(locale)` gives the same data outside the picker; `skinToneVariation(emoji, tone)` an emoji in a tone.

## Accessibility

- The list is a `grid` of `row`s and `gridcell`s named by the emojis' labels (in the locale); `aria-rowcount` counts every row, `aria-rowindex` places the ones drawn.
- Focus stays in the search field while the arrows move: the active emoji is `aria-selected` and announced by `scEmojiPickerAnnouncer`. Right to left (`dir="rtl"`, read through the CDK's `Directionality`), ← moves on and → back, as the rows run.
- The viewport is focusable, so the list can be used without the search field.
- The category navigation is a toolbar with one Tab stop.
