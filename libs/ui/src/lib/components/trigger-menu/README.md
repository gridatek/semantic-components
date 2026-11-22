# Trigger Menu

Suggestions as you type a trigger — `@` for people, `/` for commands — in a [Token Input](../token-input/README.md), a textarea or an input: a list at the character, filtered by what follows it; the one chosen becomes a token — in a text field, its text — and a space. After ui-sdk's Trigger Menu. Focus never leaves the field. (It replaced the Mention Input, 2026-11-22.)

## Architecture

```
div[scTokenInput]
├── div[scTokenInputEditor]
└── div[scTriggerMenu] ([triggers], (choose))  — match() · items() · active() · loading() · visible() · pick()
    └── ng-template[scTriggerMenuPortal]       — stamped in an overlay at the trigger
        └── div[scTriggerMenuPopup]
            ├── [scTriggerMenuEmpty]           — nothing found (keeps the menu open)
            ├── div[scTriggerMenuList]          — listbox: name it
            │   └── div[scTriggerMenuItem] [item]
            └── [scTriggerMenuStatus]          — polite live region: your words
```

## Usage

```html
<div scTokenInput>
  <div scTokenInputEditor aria-label="Message"></div>
  <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
    <ng-template scTriggerMenuPortal>
      <div scTriggerMenuPopup>
        <div scTriggerMenuEmpty>No one found.</div>
        <div scTriggerMenuList aria-label="People">
          @for (person of menu.items(); track person.value) {
          <div scTriggerMenuItem [item]="person">{{ person.label }}</div>
          }
        </div>
        <div scTriggerMenuStatus>{{ menu.items().length }} found.</div>
      </div>
    </ng-template>
  </div>
</div>
```

```ts
triggers: ScTrigger[] = [{ char: '@', type: 'mention', items: people }];
```

## In a textarea or an input

```html
<div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
  <textarea scTextarea scTriggerMenuInput [formField]="form.comment"></textarea>
  <ng-template scTriggerMenuPortal>…</ng-template>
</div>
```

`scTriggerMenuInput` on a `<textarea>` or `<input>`: the value stays plain text; a choice is put in as typed (an `input` event: forms and bindings see it) — the trigger and the label, or what the trigger's `insert(item)` writes (`@${user.username}`), then a space. The look is the field's own (`scTextarea`, `scInput`). Not in the browser's undo history.

## Triggers

`ScTrigger<T>`: `{ char, type, items, boundary? }`.

- `items`: an array of `{ value, label, keywords?, disabled? }` (more fields are yours: `menu.items()` keeps their type) — filtered by label and keywords — or a loader `(query, signal) => Promise<items>`, aborted when the query changes; the list is `aria-busy` meanwhile, `menu.loading()` says so.
- `boundary`: `'word'` (default) — after a space, a token or a line's start; `'start'` — only at the start of a line.
- The query is what follows the trigger, up to a space or a new line. A token reverted (`tokenDeletion: 'revert'`) is the exception: its text, spaces and all, is the query.
- With an empty part, the menu shows when nothing is found (and while items load); without one, it closes until something matches.

## Keyboard (the caret stays in the editor)

| Key          | Does                                                        |
| ------------ | ----------------------------------------------------------- |
| ↓ / ↑        | The next / previous item (wrapping; disabled ones skipped)  |
| Enter / Tab  | Chooses the highlighted item — Enter never sends while open |
| Escape       | Dismisses this trigger                                      |
| Ctrl + Space | Brings a dismissed trigger back                             |

It also closes when focus leaves the editor or the caret leaves the trigger.

## Look

The style's combobox popup, list, items and empty text. The popup is placed at the trigger character (below, above without room), its start edge on the character's — right to left too.

## Not yet

Commands with arguments, ghost-text hints, groups.
