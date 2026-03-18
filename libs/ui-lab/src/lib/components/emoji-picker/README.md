# Emoji Picker

A composable, searchable emoji picker built from directive primitives.

## Components & Directives

- `ScEmojiPicker` - Root provider (manages state, provides `ScEmojiPickerState`)
- `ScEmojiPickerSearch` - Search input directive
- `ScEmojiPickerCategoryTabs` - Category tab bar (`exportAs: 'scEmojiPickerCategoryTabs'`)
- `ScEmojiPickerCategoryTab` - Individual category tab button directive
- `ScEmojiPickerGrid` - Emoji grid directive (`exportAs: 'scEmojiPickerGrid'`), exposes `emojis()` and `isEmpty()`
- `ScEmojiPickerItem` - Individual emoji button directive
- `ScEmojiPickerRecent` - Recently used section directive (`exportAs: 'scEmojiPickerRecent'`), exposes `visible()`
- `ScEmojiPickerTrigger` - Button trigger for use with popover

## Usage

### Full Picker

```html
<div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
  <div class="p-2">
    <input scEmojiPickerSearch />
  </div>
  <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
    @for (category of tabs.state.categories(); track category.id) {
    <button scEmojiPickerCategoryTab [category]="category">{{ category.icon }}</button>
    }
  </div>
  <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
    @if (grid.isEmpty()) {
    <p class="text-muted-foreground col-span-full p-2 text-center text-sm">No emoji found</p>
    } @else { @for (emoji of grid.emojis(); track emoji.emoji) {
    <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
    } }
  </div>
  <div scEmojiPickerRecent #recent="scEmojiPickerRecent">
    @for (emoji of recent.state.recentEmojis(); track emoji.emoji) {
    <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
    }
  </div>
</div>
```

### Without Search

```html
<div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
  <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
    @for (category of tabs.state.categories(); track category.id) {
    <button scEmojiPickerCategoryTab [category]="category">{{ category.icon }}</button>
    }
  </div>
  <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
    @for (emoji of grid.emojis(); track emoji.emoji) {
    <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
    }
  </div>
</div>
```

### Without Category Tabs

```html
<div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
  <div class="p-2">
    <input scEmojiPickerSearch />
  </div>
  <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
    @if (grid.isEmpty()) {
    <p class="text-muted-foreground col-span-full p-2 text-center text-sm">No emoji found</p>
    } @else { @for (emoji of grid.emojis(); track emoji.emoji) {
    <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
    } }
  </div>
</div>
```

### Custom Empty State

```html
<div scEmojiPicker>
  <div class="p-2">
    <input scEmojiPickerSearch />
  </div>
  <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
    @if (grid.isEmpty()) {
    <div class="p-4 text-center">No results. Try a different search term.</div>
    } @else { @for (emoji of grid.emojis(); track emoji.emoji) {
    <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
    } }
  </div>
</div>
```

### With Popover

```html
<div scPopoverProvider>
  <button scPopoverTrigger scEmojiPickerTrigger></button>
  <ng-template scPopoverPortal>
    <div scPopover>
      <div scEmojiPicker (emojiSelect)="insertEmoji($event)">
        <div class="p-2">
          <input scEmojiPickerSearch />
        </div>
        <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
          @for (category of tabs.state.categories(); track category.id) {
          <button scEmojiPickerCategoryTab [category]="category">{{ category.icon }}</button>
          }
        </div>
        <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
          @if (grid.isEmpty()) {
          <p class="text-muted-foreground col-span-full p-2 text-center text-sm">No emoji found</p>
          } @else { @for (emoji of grid.emojis(); track emoji.emoji) {
          <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
          } }
        </div>
        <div scEmojiPickerRecent #recent="scEmojiPickerRecent">
          @for (emoji of recent.state.recentEmojis(); track emoji.emoji) {
          <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
          }
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

### Two-Way Binding

```html
<div scEmojiPicker [(value)]="selectedEmoji">
  <div scEmojiPickerCategoryTabs #tabs="scEmojiPickerCategoryTabs">
    @for (category of tabs.state.categories(); track category.id) {
    <button scEmojiPickerCategoryTab [category]="category">{{ category.icon }}</button>
    }
  </div>
  <div scEmojiPickerGrid #grid="scEmojiPickerGrid">
    @for (emoji of grid.emojis(); track emoji.emoji) {
    <button scEmojiPickerItem [emoji]="emoji">{{ emoji.emoji }}</button>
    }
  </div>
</div>
```

## API

### ScEmojiPicker

| Input        | Type              | Default            | Description                      |
| ------------ | ----------------- | ------------------ | -------------------------------- |
| `class`      | `string`          | `''`               | Additional CSS classes           |
| `categories` | `EmojiCategory[]` | Default categories | Custom emoji categories          |
| `maxRecent`  | `number`          | `8`                | Max recently used emojis to show |
| `columns`    | `number`          | `8`                | Number of columns in grid        |
| `value`      | `string`          | `''`               | Selected emoji (two-way)         |

| Output        | Type    | Description                    |
| ------------- | ------- | ------------------------------ |
| `emojiSelect` | `Emoji` | Emitted when emoji is selected |

### ScEmojiPickerSearch

Attribute directive for `<input>` elements. Automatically binds to the picker's search state.

### ScEmojiPickerCategoryTabs

Directive with `exportAs: 'scEmojiPickerCategoryTabs'`. Exposes `state` for accessing `categories()`. Consumers write the `@for` loop.

### ScEmojiPickerCategoryTab

Attribute directive for category tab buttons. Requires a `category` input.

### ScEmojiPickerGrid

Directive with `exportAs: 'scEmojiPickerGrid'`. Exposes:

- `emojis()` — returns filtered emojis when searching, active category emojis otherwise
- `isEmpty()` — `true` when search is active and no results found
- `state` — the underlying `ScEmojiPickerState`

Consumers write the `@for` loop and empty state `@if` check.

### ScEmojiPickerItem

Attribute directive for emoji buttons. Requires an `emoji` input.

### ScEmojiPickerRecent

Directive with `exportAs: 'scEmojiPickerRecent'`. Exposes:

- `visible()` — `true` when there are recent emojis and not searching
- `state` — the underlying `ScEmojiPickerState`

Auto-hides via `[hidden]` when not visible. Consumers write the `@for` loop.

## Types

```typescript
interface Emoji {
  emoji: string;
  name: string;
  keywords?: string[];
}

interface EmojiCategory {
  id: string;
  name: string;
  icon: string;
  emojis: Emoji[];
}
```
