# Emoji Picker

A searchable emoji picker with categories, search functionality, and recently used emojis.

## Components

- `ScEmojiPicker` - Main emoji picker panel
- `ScEmojiPickerTrigger` - Button trigger for use with popover

## Usage

```html
<!-- Basic usage -->
<sc-emoji-picker (emojiSelect)="onEmojiSelect($event)" />

<!-- Without search -->
<sc-emoji-picker [showSearch]="false" />

<!-- Without category tabs -->
<sc-emoji-picker [showCategories]="false" />

<!-- Without recently used -->
<sc-emoji-picker [showRecent]="false" />

<!-- Custom columns -->
<sc-emoji-picker [columns]="6" class="w-56" />

<!-- Two-way binding -->
<sc-emoji-picker [(value)]="selectedEmoji" />
```

## API

### ScEmojiPicker

| Input            | Type              | Default            | Description                      |
| ---------------- | ----------------- | ------------------ | -------------------------------- |
| `class`          | `string`          | `''`               | Additional CSS classes           |
| `categories`     | `EmojiCategory[]` | Default categories | Custom emoji categories          |
| `showSearch`     | `boolean`         | `true`             | Show search input                |
| `showCategories` | `boolean`         | `true`             | Show category tabs               |
| `showRecent`     | `boolean`         | `true`             | Show recently used section       |
| `maxRecent`      | `number`          | `8`                | Max recently used emojis to show |
| `columns`        | `number`          | `8`                | Number of columns in grid        |
| `value`          | `string`          | `''`               | Selected emoji (two-way)         |

| Output        | Type    | Description                    |
| ------------- | ------- | ------------------------------ |
| `emojiSelect` | `Emoji` | Emitted when emoji is selected |

### ScEmojiPickerTrigger

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

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

## Default Categories

The picker includes these default categories:

- Smileys & Emotion (😀)
- People & Body (👋)
- Animals & Nature (🐶)
- Food & Drink (🍔)
- Activities (⚽)
- Objects (💡)
- Symbols (❤️)
- Flags (🏁)

## Examples

### With Popover

```html
<div sc-popover-provider>
  <button sc-popover-trigger sc-emoji-picker-trigger></button>
  <div sc-popover-portal>
    <div sc-popover>
      <sc-emoji-picker (emojiSelect)="insertEmoji($event)" />
    </div>
  </div>
</div>
```

### In Chat Input

```html
<div class="relative">
  <input type="text" [(ngModel)]="message" />
  <button (click)="showPicker = !showPicker">😀</button>
</div>
@if (showPicker) {
<sc-emoji-picker (emojiSelect)="message = message + $event.emoji; showPicker = false" />
}
```

### Quick Reactions

```html
<div class="flex gap-1">
  @for (emoji of ['👍', '❤️', '😂', '😮', '😢']; track emoji) {
  <button (click)="addReaction(emoji)">{{ emoji }}</button>
  }
</div>
```

### Custom Categories

```typescript
const customCategories: EmojiCategory[] = [
  {
    id: 'favorites',
    name: 'Favorites',
    icon: '⭐',
    emojis: [
      { emoji: '👍', name: 'thumbs up' },
      { emoji: '❤️', name: 'red heart' },
      { emoji: '🎉', name: 'party popper' },
    ],
  },
];
```

```html
<sc-emoji-picker [categories]="customCategories" />
```

## Features

- **Search**: Type to filter emojis by name or keywords
- **Categories**: Navigate between emoji categories with tabs
- **Recently Used**: Automatically tracks recently selected emojis
- **Keyboard Navigation**: Navigate with arrow keys
- **Accessible**: Proper ARIA labels for screen readers
