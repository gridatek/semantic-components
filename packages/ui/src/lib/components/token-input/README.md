# Token Input

A text field that holds tokens in its text — people mentioned, files attached to a prompt — each moving, deleting and copying whole. After ui-sdk's Token Input. With a [Trigger Menu](../trigger-menu/README.md), typing `@` or `/` suggests them.

## Architecture

```
div[scTokenInput] ([(value)] / [formField], tokenDeletion, submitShortcut, codec, (submitted))
│  insert() · updateToken() · removeToken() · undo() · redo() · clear() · focus() · lastChange()
├── div[scTokenInputEditor]           — contenteditable textbox (multi-line); placeholder
├── ng-template[scTokenInputToken]    — a token's content, written once (let-token)
│   └── [scTokenInputTokenRemove]     — removes its token (aria-hidden; Backspace for the keyboard)
├── div[scTriggerMenu]                — suggestions (optional)
└── div[scTokenInputStatus]           — polite live region: your words from lastChange()
```

## Usage

```html
<div scField>
  <label scLabel>Prompt</label>
  <div scTokenInput [(value)]="prompt">
    <div scTokenInputEditor placeholder="Ask anything…"></div>
    <ng-template scTokenInputToken let-token>
      <svg siFileTextIcon></svg>
      {{ token.label }}
      <span class="sr-only">file</span>
      <span scTokenInputTokenRemove><svg siXIcon></svg></span>
    </ng-template>
  </div>
</div>
```

## The value

`ScTokenInputValue`: `(string | ScToken)[]` — text and tokens in order. A token is `{ type, value, label, id?, status?: 'pending' | 'unresolved' }`; `insert()` gives the tokens it puts in an id, for `updateToken()` (a file uploading, then ready).

As text — copy, paste, what a server reads — each token is written by the `codec`, by default `[@label](type:value)`. `tokenInputToText(value, codec?)`, `tokenInputFromText(text, codec?)` and `tokenInputToLabel(value)` (as it reads) turn a value into text and back. A codec is `{ format(token), parse(text) }`.

In a form the value is the array: an empty array is not empty to Signal Forms' `required()` — check `tokenInputToLabel(value).trim()` in a `validate()`.

## How it edits

- Typing is the browser's: spellcheck, autocorrect, input methods. The editor reads what was typed back into the value.
- Everything else is its own, shown at once: deleting next to a token, the arrows over one, new lines, the clipboard (tokens as the codec's text), undo.
- `tokenDeletion`: `whole` (Backspace removes the token), `select` (selects it, then removes it), `revert` (turns it back into its text — with a Trigger Menu, the menu opens on it).
- Undo is its own history (the browser's breaks once code changes the editor): typing a second at a time, each paste, cut or token a step; 100 steps.
- `submitShortcut`: `'enter'` (Shift + Enter a new line), `'mod+enter'` (Ctrl/⌘ + Enter), or `null` (Enter a new line); `(submitted)` gets the value. While a Trigger Menu is open, Enter chooses.
- The editor writes its content in the browser: on the server it is empty.

## Keyboard

| Key                         | Does                                                                                         |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| ← / →                       | Over a token in one press (as the text reads, right to left too)                             |
| Backspace / Delete          | The token before / after the caret, as `tokenDeletion` says; a word or line stops at a token |
| Shift + Enter               | A new line                                                                                   |
| Enter / Ctrl + Enter        | Sends, as `submitShortcut` says                                                              |
| Ctrl + Z                    | Undo                                                                                         |
| Ctrl + Shift + Z / Ctrl + Y | Redo                                                                                         |

A text that ends with a token ends with a line break (`<br data-sc-end>`, not part of the value): the caret can go after the token in every browser (Firefox, without it, puts it before).

## API

### ScTokenInput — `div[scTokenInput]`, `#input="scTokenInput"`

| Input                                                        | Type                              | Default                |
| ------------------------------------------------------------ | --------------------------------- | ---------------------- |
| `value`                                                      | `ScTokenInputValue` (model)       | `[]`                   |
| `tokenDeletion`                                              | `'whole' \| 'select' \| 'revert'` | `'whole'`              |
| `submitShortcut`                                             | `'enter' \| 'mod+enter' \| null`  | `null`                 |
| `codec`                                                      | `ScTokenCodec`                    | `[@label](type:value)` |
| `disabled` / `readonly` / `required` / `invalid` / `touched` | `boolean`                         | `false`                |

| Output      | When                                          |
| ----------- | --------------------------------------------- |
| `submitted` | The submit shortcut: the value                |
| `touch`     | Focus left it (Signal Forms marks it touched) |

Methods and state: `insert(content, at?)` (`'caret'`, `'end'` or an offset; returns the tokens with ids), `updateToken(id, patch)` (not an undo step), `removeToken(id)`, `undo()`, `redo()`, `canUndo()`, `canRedo()`, `clear()`, `focus()`, `lastChange()` (`{ reason, added, removed }`), `selectedToken()`.

### ScTokenInputEditor — `div[scTokenInputEditor]`

`role="textbox"`, `aria-multiline`; named by its field's label or `aria-label`. Input `placeholder` (shown while empty, `aria-placeholder`). With a Trigger Menu: `aria-autocomplete="list"`, `aria-controls` and `aria-activedescendant` while the list shows. The style's textarea look.

### ScTokenInputToken — `ng-template[scTokenInputToken]`

A token's content (`let-token`), stamped in each token's chip (`data-slot="token-input-token"`, `data-token-type`, `data-selected`, `data-pending`, `data-unresolved`) — the style's combobox chip. Write the kind in an `sr-only` span: a token reads as its content.

### ScTokenInputTokenRemove — `[scTokenInputTokenRemove]`

Inside the token template, around an icon: removes its token; `aria-hidden`, focus stays in the editor. Hidden while disabled or read-only.

### ScTokenInputStatus — `div[scTokenInputStatus]`

`role="status"`, polite, `sr-only`: write in it, from `lastChange()`, what to announce.
