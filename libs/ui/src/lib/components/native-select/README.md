# Native Select

The browser's own select, in the look of the app's preset (the `nativeSelect` key: the select and the chevron's place). shadcn's Native Select; Base UI has none.

## Usage

```html
<div scField>
  <label scLabel>Status</label>
  <div scNativeSelectContainer class="w-full">
    <select scNativeSelect [formField]="form.status">
      <option scNativeSelectOption value="">Select status</option>
      <option scNativeSelectOption value="todo">Todo</option>
      <option scNativeSelectOption value="done">Done</option>
    </select>
    <svg siChevronDownIcon scNativeSelectIcon></svg>
  </div>
  <div scFieldErrors></div>
</div>
```

## Parts

| Part                        | Selector                              | What it does                                                                                                                                       |
| --------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScNativeSelect`            | `select[scNativeSelect]`              | The browser's select, the preset's look. `size` (`default`, `sm`); id and description from a `scField`; `[formField]`; `aria-invalid` once touched |
| `ScNativeSelectContainer`   | `div[scNativeSelectContainer]`        | Around the select and your chevron: `w-fit` (`w-full` to fill a field), dimmed while the select is disabled; its select's `data-size`              |
| `ScNativeSelectIcon`        | `svg[scNativeSelectIcon]`             | Your chevron, after the select: placed at its end by the preset, `aria-hidden`                                                                     |
| `ScNativeSelectOption`      | `option[scNativeSelectOption]`        | An option: `bg-[Canvas] text-[CanvasText]`, so the browser's list reads in dark mode                                                               |
| `ScNativeSelectOptionGroup` | `optgroup[scNativeSelectOptionGroup]` | A group of options under its `label`: the same colours                                                                                             |

The container's classes are the same in every style, so they are in the part; the select's and the icon's are the preset's, copied as shadcn writes them (`data-[size=sm]:`, mira's `group-data-[size=sm]/native-select:` on the icon — the container carries the size for it).

## Native Select or Select

- **Native Select**: the browser's behaviour, light and fast, the phone's own picker.
- **[Select](../select/README.md)**: its list styled as the app, animated, richer items and interactions.

## Not taken

- **The customizable select** (`appearance: base-select`, `::picker(select)`): Chromium only, and shadcn's doesn't use it.
- **A `size` attribute of the browser's** (rows shown as a list box): `size` is ours, the height.
