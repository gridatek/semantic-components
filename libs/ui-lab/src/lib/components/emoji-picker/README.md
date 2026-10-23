# Emoji Picker

An emoji picker assembled from parts, modelled on [Frimousse](https://frimousse.liveblocks.io) (the React picker shadcn/ui's emoji picker is built on):

- **One scrolling list** of every category, with sticky headers, **virtualised**: only the rows in view are drawn.
- **Keyboard first**: typing filters, the arrow keys move an active emoji from the search field (focus stays there) and Enter picks it; the active emoji is announced to screen readers and can be previewed.
- **Skin tones**, applied to the whole list.
- **28 languages**: the emojis' names and the search come from [Emojibase](https://emojibase.dev) in the picker's `locale`.
- **No ▯ boxes**: emojis newer than the system can draw are left out.
- Category navigation and recently used emojis, if you want them.

You write the markup and every piece of text — placeholders, labels, empty and loading states, category icons; the parts add the behaviour, the ARIA wiring and the default (shadcn) styles.

## Usage

```html
<div scEmojiPicker (emojiSelect)="pick($event)" #picker="scEmojiPicker">
  <div scEmojiPickerSearchField>
    <svg siSearchIcon></svg>
    <input scEmojiPickerSearch placeholder="Search…" aria-label="Search emojis" />
  </div>
  <div scEmojiPickerViewport>
    <span scEmojiPickerLoading><svg scSpinner aria-label="Loading" siLoaderCircleIcon></svg></span>
    <span scEmojiPickerEmpty>No emoji found.</span>
    <span scEmojiPickerError>Couldn't load the emojis.</span>
    <span scEmojiPickerAnnouncer></span>
    <div scEmojiPickerList aria-label="Emojis" #list="scEmojiPickerList">
      @for (category of list.categories(); track category.key) {
      <div [scEmojiPickerCategory]="category">
        <div scEmojiPickerCategoryHeader>{{ category.label }}</div>
      </div>
      } @for (row of list.rows(); track row.index) {
      <div [scEmojiPickerRow]="row">
        @for (emoji of row.emojis; track emoji.columnIndex) {
        <button [scEmojiPickerEmoji]="emoji">{{ emoji.emoji }}</button>
        }
      </div>
      }
    </div>
  </div>
  <div scEmojiPickerFooter>
    @if (picker.activeEmoji(); as emoji) {
    <span class="text-lg">{{ emoji.emoji }}</span>
    <span class="truncate text-xs">{{ emoji.label }}</span>
    } @else {
    <span class="text-muted-foreground text-xs">Select an emoji…</span>
    }
    <button scEmojiPickerSkinTone #tone="scEmojiPickerSkinTone" class="ms-auto" aria-label="Change skin tone">{{ tone.variation() }}</button>
  </div>
</div>
```

In a popover, put it in a `scPopover` (with `p-0`) opened by your `scButton`; the search field takes focus.

## Parts

| Part                          | Selector                                         | Does                                                                                                                                                                           |
| ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScEmojiPicker`               | `div[scEmojiPicker]`                             | The picker (`exportAs: 'scEmojiPicker'`). Arrow keys / Enter while focus is in the search field or the list.                                                                   |
| `ScEmojiPickerSearchField`    | `div[scEmojiPickerSearchField]`                  | The search row: your icon, then the field.                                                                                                                                     |
| `ScEmojiPickerSearch`         | `input[scEmojiPickerSearch]`                     | Filters as you type (by name, then keywords); the first result becomes active.                                                                                                 |
| `ScEmojiPickerViewport`       | `div[scEmojiPickerViewport]`                     | The scrolling frame (focusable: the arrows work from it too).                                                                                                                  |
| `ScEmojiPickerList`           | `div[scEmojiPickerList]`                         | The grid (`role="grid"`, `exportAs: 'scEmojiPickerList'`): `categories()` — all of them — and `rows()` — the ones in view. Give it an `aria-label`.                            |
| `ScEmojiPickerCategory`       | `div[scEmojiPickerCategory]="category"`          | A category's place over its rows; holds its header.                                                                                                                            |
| `ScEmojiPickerCategoryHeader` | `div[scEmojiPickerCategoryHeader]`               | Write `category.label`; sticks while the rows scroll (`[sticky]="false"` on the picker: not).                                                                                  |
| `ScEmojiPickerRow`            | `div[scEmojiPickerRow]="row"`                    | A row (`role="row"`) of `row.emojis`.                                                                                                                                          |
| `ScEmojiPickerEmoji`          | `button[scEmojiPickerEmoji]="emoji"`             | Write `emoji.emoji`; picks it. `data-active` when hovered or moved to; named by its label.                                                                                     |
| `ScEmojiPickerLoading`        | `[scEmojiPickerLoading]`                         | Shown while the data loads.                                                                                                                                                    |
| `ScEmojiPickerEmpty`          | `[scEmojiPickerEmpty]`                           | Shown when nothing matches (`exportAs: 'scEmojiPickerEmpty'`, `search()` for your text).                                                                                       |
| `ScEmojiPickerError`          | `[scEmojiPickerError]`                           | Shown (`role="alert"`) when the data couldn't be loaded.                                                                                                                       |
| `ScEmojiPickerAnnouncer`      | `[scEmojiPickerAnnouncer]`                       | Visually hidden live region: says the emoji moved to with the keyboard (focus stays in the search field).                                                                      |
| `ScEmojiPickerFooter`         | `div[scEmojiPickerFooter]`                       | A row under the list, as wide as it.                                                                                                                                           |
| `ScEmojiPickerSkinTone`       | `button[scEmojiPickerSkinTone]`                  | Cycles the skin tone; `variation()` is its emoji (`✋`, or yours: `scEmojiPickerSkinTone="👍"`) in the current tone. Give it an `aria-label` (`picker.skinToneNames()`).       |
| `ScEmojiPickerCategoryNav`    | `div[scEmojiPickerCategoryNav]`                  | A toolbar of category buttons (one Tab stop, arrow keys). Give it an `aria-label`.                                                                                             |
| `ScEmojiPickerCategoryButton` | `button[scEmojiPickerCategoryButton]="category"` | Scrolls to the category (`picker.categories()`); `aria-pressed` on the one at the top. Write its icon — `category.key` (`smileys-emotion`, `people-body`… `recent`) to choose. |

## `scEmojiPicker`

- **Inputs**: `locale` (`'en'`; Emojibase's 28 languages), `columns` (`10`), `emojiVersion` (the newest Emoji version to show; by default the newest the system draws), `emojibaseUrl` (where Emojibase's data is fetched from — jsDelivr by default; host the `emojibase-data` package's locale folders yourself if you like), `data` (your own `ScEmojiData` instead), `sticky` (`true`), `maxRecent` (`20`), `recentLabel` (the name of a first category of the recent emojis — none without it).
- **Two-way**: `skinTone` (`'none' | 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark'`), `recent` (`ScEmoji[]`, latest first — keep it to restore it).
- **Output**: `emojiSelect` (`{ emoji, label }`).
- **State for your text**: `loading()`, `failed()`, `empty()`, `search()`, `activeEmoji()`, `categories()`, `currentCategory()`, `skinToneNames()`.
- **Methods**: `focus()`, `scrollToCategory(index)`, `nextSkinTone()`, `skinToneVariations(emoji)`.

## Data

Emojibase's `data.json` and `messages.json` for the locale are fetched once, kept in `localStorage` and checked for updates (by ETag) once per session; the emojis are then filtered to what the system draws (country flags too — Windows has none). `loadEmojiData(locale)` gives the same data outside the picker; `skinToneVariation(emoji, tone)` an emoji in a tone.

## Accessibility

- The list is a `grid` of `row`s and `gridcell`s named by the emojis' labels (in the locale); `aria-rowcount` counts every row, `aria-rowindex` places the ones drawn.
- Focus stays in the search field while the arrows move: the active emoji is `aria-selected` and announced by `scEmojiPickerAnnouncer`.
- The viewport is focusable, so the list can be used without the search field.
- The category navigation is a toolbar with one Tab stop.
