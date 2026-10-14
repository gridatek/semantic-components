# Hotkey

A directive that runs an action on a keyboard shortcut, anywhere on the page, and writes the shortcut for the platform.

## Import

```typescript
import { ScHotkey } from '@semantic-components/ui';
```

## API

| Property          | Type     | Description                                                                                       |
| ----------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `scHotkey`        | `string` | The shortcut, e.g. `mod+k`, `alt+shift+n` (`mod`: ⌘ on a Mac, Ctrl elsewhere)                     |
| `scHotkeyPressed` | output   | The shortcut was pressed (the browser's own action for it is prevented)                           |
| `displayKey()`    | signal   | The shortcut written for the platform: `⌘K` on a Mac, `Ctrl+K` elsewhere (`exportAs: 'scHotkey'`) |

- **Selector**: `[scHotkey]`
- The modifiers must match exactly: `mod+k` doesn't fire on Ctrl+Shift+K.
- It listens on the document while its element is shown.

## Usage

```html
<button scButton scHotkey="mod+s" #hotkey="scHotkey" (scHotkeyPressed)="save()" (click)="save()">
  Save
  <kbd scKbd>{{ hotkey.displayKey() }}</kbd>
</button>
```
