# Tags Input Next

The tags input, rebuilt: tags typed into one field — a `string[]` for Signal Forms — checked before they go in, and reached by the keyboard without a Tab stop each.

## Architecture

```
[scTagsInputNext] (value: string[] — a [formField]; maxLength, delimiter, accept, disabled)
│  add(...tags) · removeAt(i) · clear() · rejected() · full()
├── [scTagsInputNextItem]                 — a tag; reached by keys from the field
│   └── button[scTagsInputNextItemRemove] — removes it; not a Tab stop; name it
├── input[scTagsInputNextControl]         — where tags are typed; the Tab stop
└── button[scTagsInputNextClear]          — removes them all; name it
```

## Usage

```html
<div scField>
  <label scLabel>Skills</label>
  <div scTagsInputNext [(value)]="skills">
    @for (skill of skills(); track $index) {
    <span scTagsInputNextItem>
      <span>{{ skill }}</span>
      <button scTagsInputNextItemRemove>
        <svg siXIcon></svg>
        <span class="sr-only">Remove {{ skill }}</span>
      </button>
    </span>
    }
    <input scTagsInputNextControl placeholder="Add a skill" />
  </div>
</div>
```

## Adding

- Enter, or the `delimiter` (`,` by default), adds what is typed; so does leaving the field. An empty Enter is left to the form (submit).
- A paste with the delimiter or new lines in it is split into tags.
- Tags are trimmed; blanks are skipped.
- `accept(tag, tags)` decides first — by default, no duplicates. Refused text stays in the field, `aria-invalid`, until it is edited (`rejected()`).
- `maxLength`: at it (`data-full`), nothing more goes in. With a `[formField]`, the schema's `maxLength` sets it.

## Keyboard

| Where            | Key                            | Does                                                        |
| ---------------- | ------------------------------ | ----------------------------------------------------------- |
| The field, empty | Backspace, ← (→ right to left) | the last tag                                                |
| A tag            | ← →                            | the tag before, after — past the last, the field            |
| A tag            | Home, End                      | the first tag, the field                                    |
| A tag            | Delete, Backspace              | removes it; focus to the tag now in its place, or the field |
| A tag            | Escape                         | the field                                                   |

## Signal Forms

`[formField]` on the root. `minLength(path, 1)` for at least one — `required` does not count an empty list as empty — and `maxLength(path, n)` for at most n, which also stops more going in. Touched when focus leaves it; invalid and touched, it and its field are marked.

## Not here

Suggestions (a combobox or multiselect), editing a tag in place, reordering by drag, counts and announcements (yours to write).
