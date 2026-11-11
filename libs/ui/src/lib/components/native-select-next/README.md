# Native Select Next

The browser's own select, in the look of the app's preset (the `nativeSelect` key: the select and the chevron's place). shadcn's Native Select; Base UI has none. Built beside [Native Select](../native-select/README.md), to compare.

## Usage

```html
<div scField>
  <label scLabel>Status</label>
  <div scNativeSelectNextContainer class="w-full">
    <select scNativeSelectNext [formField]="form.status">
      <option scNativeSelectNextOption value="">Select status</option>
      <option scNativeSelectNextOption value="todo">Todo</option>
      <option scNativeSelectNextOption value="done">Done</option>
    </select>
    <svg siChevronDownIcon scNativeSelectNextIcon></svg>
  </div>
  <div scFieldErrors></div>
</div>
```

## Parts

| Part                          | Selector                               | What it does                                                                                                                                       |
| ----------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNativeSelectNext`          | `select[scNativeSelectNext]`           | The browser's select, the preset's look. `size` (`default`, `sm`); id and description from a `scField`; `[formField]`; `aria-invalid` once touched |
| `ScNativeSelectNextContainer` | `div[scNativeSelectNextContainer]`     | Around the select and your chevron: `w-fit` (`w-full` to fill a field), dimmed while the select is disabled; its select's `data-size`              |
| `ScNativeSelectNextIcon`      | `svg[scNativeSelectNextIcon]`          | Your chevron, after the select: placed at its end by the preset, `aria-hidden`                                                                     |
| `ScNativeSelectNextOption`    | `option[scNativeSelectNextOption]`     | An option: `bg-[Canvas] text-[CanvasText]`, so the browser's list reads in dark mode                                                               |
| `ScNativeSelectNextOptGroup`  | `optgroup[scNativeSelectNextOptGroup]` | A group of options under its `label`: the same colours                                                                                             |

The container's classes are the same in every style, so they are in the part; the select's and the icon's are the preset's, copied as shadcn writes them (`data-[size=sm]:`, mira's `group-data-[size=sm]/native-select:` on the icon — the container carries the size for it).

## Native Select or Select

- **Native Select**: the browser's behaviour, light and fast, the phone's own picker.
- **[Select](../select/README.md)**: its list styled as the app, animated, richer items and interactions.

## Not taken

- **The customizable select** (`appearance: base-select`, `::picker(select)`): Chromium only, and shadcn's doesn't use it.
- **A `size` attribute of the browser's** (rows shown as a list box): `size` is ours, the height.
