# Emoji Picker

A composable, searchable emoji picker built from directive primitives.

## Components & Directives

- `ScEmojiPicker` - Root provider (manages state, provides `ScEmojiPickerState`)
- `ScEmojiPickerSearch` - Search input directive
- `ScEmojiPickerCategoryTabs` - Category tab bar
- `ScEmojiPickerGrid` - Emoji grid (shows search results or active category)
- `ScEmojiPickerItem` - Individual emoji button directive
- `ScEmojiPickerRecent` - Recently used section
- `ScEmojiPickerEmpty` - Custom empty state directive
- `ScEmojiPickerTrigger` - Button trigger for use with popover

## Usage

### Full Picker

```html
<div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
  <div class="border-b p-2">
    <input scEmojiPickerSearch />
  </div>
  <div scEmojiPickerCategoryTabs></div>
  <div scEmojiPickerGrid></div>
  <div scEmojiPickerRecent></div>
</div>
```

### Without Search

```html
<div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
  <div scEmojiPickerCategoryTabs></div>
  <div scEmojiPickerGrid></div>
</div>
```

### Without Category Tabs

```html
<div scEmojiPicker (emojiSelect)="onEmojiSelect($event)">
  <div class="border-b p-2">
    <input scEmojiPickerSearch />
  </div>
  <div scEmojiPickerGrid></div>
</div>
```

### Custom Empty State

```html
<div scEmojiPicker>
  <div class="border-b p-2">
    <input scEmojiPickerSearch />
  </div>
  <div scEmojiPickerGrid>
    <div scEmojiPickerEmpty>No results. Try a different search term.</div>
  </div>
</div>
```

### With Popover

```html
<div scPopoverProvider>
  <button scPopoverTrigger scEmojiPickerTrigger></button>
  <div scPopoverPortal>
    <div scPopover>
      <div scEmojiPicker (emojiSelect)="insertEmoji($event)">
        <div class="border-b p-2">
          <input scEmojiPickerSearch />
        </div>
        <div scEmojiPickerCategoryTabs></div>
        <div scEmojiPickerGrid></div>
        <div scEmojiPickerRecent></div>
      </div>
    </div>
  </div>
</div>
```

### Two-Way Binding

```html
<div scEmojiPicker [(value)]="selectedEmoji">
  <div scEmojiPickerCategoryTabs></div>
  <div scEmojiPickerGrid></div>
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

Renders category tab buttons from the picker's categories.

### ScEmojiPickerGrid

Displays the emoji grid. Shows search results when searching, otherwise shows the active category.

### ScEmojiPickerItem

Attribute directive for emoji buttons. Requires an `emoji` input.

### ScEmojiPickerRecent

Displays recently used emojis. Auto-hides when empty or when searching.

### ScEmojiPickerEmpty

Attribute directive for custom empty state content inside `ScEmojiPickerGrid`.

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
