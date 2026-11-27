# Input Button

A button that looks like a text field — in the look of the app's style's `input` — to open a search, a command palette or a picker (the Date Picker's trigger goes on it). Our own: shadcn has none.

## Usage

```html
<button scInputButton data-placeholder>
  <svg siSearchIcon></svg>
  <span class="flex-1">Search...</span>
  <kbd scKbd>⌘<span class="sr-only"> Command</span>J</kbd>
</button>
```

## Part

| Part            | Selector                | What it does                                                                                                                                                                                          |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScInputButton` | `button[scInputButton]` | The style's input look, its text muted while `data-placeholder` (yours on a search; a picker's trigger sets it while empty), a long text cut, its icon sized (`size-4` unless yours); `type="button"` |

## Keyboard and screen readers

- A button, not a field: read as one, pressed with Enter or Space. What it opens does the searching.
- Its name is its text; icon only, give it sr-only text. Name a shortcut's symbols too (⌘: "Command").
