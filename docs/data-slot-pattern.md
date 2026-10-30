# Data Slots

`data-slot` is an optional attribute used by some components for CSS-based layout detection. It is **not mandatory** — only add it when a parent or sibling component needs to detect the presence or position of a child element via CSS selectors like `has-[>`, `*:data-[slot=`, or `in-data-[slot=`.

## When to use `data-slot`

Add `data-slot` to a component only when another component references it in its styles. Common patterns:

- **`has-[>[data-slot=X]]`** — parent detects if child X exists to adjust layout (e.g., card-header adds a grid column when card-action is present)
- **`*:data-[slot=X]`** — parent targets child X for positioning (e.g., checkbox-field positions the label and description in a CSS grid)
- **`in-data-[slot=X]`** — child detects it's inside parent X and adjusts its own styles (e.g., input strips borders when inside input-group)

## Naming: generic, by role

A slot names the role a part plays for the component that reads it, not the component itself — so every part playing that role shares it. `control` is the model: input, textarea and the combobox's and multiselect's values all set `data-slot="control"`, and the input group reads that one name, whichever control it holds. A new slot is named the same way: what the reader needs to know (a control, a label, a description), not which part it is.

## When NOT to use `data-slot`

Do not add `data-slot` as a convention or for identification purposes. If no component references the value in its styles, it should not exist.

## Active data-slots

The following `data-slot` values are currently in use:

| data-slot              | Declared in                                                                            | Referenced by                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alert-action`         | `alert-action.ts`                                                                      | `alert.ts` — adds right padding when action exists                                                                                                             |
| `alert-description`    | `alert-description.ts`                                                                 | `alert.ts` — styles description in destructive variant                                                                                                         |
| `alert-dialog-media`   | `alert-dialog-media.ts`                                                                | `alert-dialog-header.ts`, `alert-dialog-title.ts` — switches grid layout                                                                                       |
| `avatar`               | `avatar.ts`                                                                            | `avatar-group.ts` — adds ring to avatars in a group                                                                                                            |
| `button`               | `button.ts`, `link.ts`                                                                 | `control-group.ts` (presets luma, rhea, sera) — an input's border beside a group's buttons                                                                     |
| `control-group`        | `control-group.ts`                                                                     | `button.ts` (presets, xs/sm sizes), `control-group.ts` — corners in a group; a nested group's gap                                                              |
| `card-action`          | `card-action.ts`                                                                       | `card-header.ts` — switches header to 2-column grid                                                                                                            |
| `card-description`     | `card-description.ts`                                                                  | `card-header.ts` — adds extra grid row                                                                                                                         |
| `card-footer`          | `card-footer.ts`                                                                       | `card.ts` — removes bottom padding                                                                                                                             |
| `checkbox`             | `checkbox.ts`                                                                          | `checkbox-field.ts` — grid positioning                                                                                                                         |
| `checkbox-visual`      | `checkbox-visual.ts`                                                                   | `checkbox-field.ts` — grid positioning                                                                                                                         |
| `command-group-label`  | `command-group-label.ts`                                                               | `command-group.ts` — styles nested label                                                                                                                       |
| `context-menu`         | `context-menu.ts`                                                                      | `context-menu.ts` (CSS) — positions menu panel                                                                                                                 |
| `control`              | `input.ts`, `textarea.ts`, `combobox-display-value.ts`, `multiselect-display-value.ts` | `input-group.ts` (presets) — focus/invalid ring, and gives the control the look of being inside; `control-group.ts` (preset sera) — padding                    |
| `field`                | `field.ts`                                                                             | `label.ts`, `field.ts`, `checkbox-field.ts`, `radio-field.ts`, `switch-field.ts` — layout detection                                                            |
| `field-body`           | `field-body.ts`                                                                        | `field.ts` — adjusts alignment                                                                                                                                 |
| `field-description`    | `field-description.ts`                                                                 | `checkbox-field.ts`, `radio-field.ts`, `switch-field.ts` — bold label, grid positioning                                                                        |
| `field-group`          | `field-group.ts`                                                                       | `field-group.ts` — nested group gap                                                                                                                            |
| `input-group`          | `input-group.ts`                                                                       | `textarea.ts`, `segmented-date-input.ts`, `time-input.ts` — strip their own border/ring inside a group; `control-group.ts` (presets luma, rhea, sera) — border |
| `item-body`            | `item-body.ts`                                                                         | `item-body.ts` — second body gets `flex-none`                                                                                                                  |
| `item-description`     | `item-description.ts`                                                                  | `item-media.ts` — aligns media to top                                                                                                                          |
| `label`                | `label.ts`                                                                             | `checkbox-field.ts`, `radio-field.ts`, `field.ts` — grid positioning, font-weight                                                                              |
| `label-text`           | `label-text.ts`                                                                        | `switch-field.ts` — grid column positioning                                                                                                                    |
| `menu`                 | `menu.ts`                                                                              | `context-menu.ts` (CSS) — positions menu panel                                                                                                                 |
| `navigation-menu-link` | `navigation-menu-link.ts`                                                              | `navigation-menu-content.ts` — removes focus ring                                                                                                              |
| `radio`                | `radio.ts`                                                                             | `radio-field.ts`, `fieldset.ts` — grid positioning                                                                                                             |
| `radio-group`          | `radio-group.ts`                                                                       | `fieldset.ts` — reduces gap                                                                                                                                    |
| `select`               | `select.ts`                                                                            | `control-group.ts` (presets) — its trigger joined to its neighbours; fits its value (`min-w-0`)                                                                |
| `select-trigger`       | `select-trigger.ts`                                                                    | `control-group.ts` (presets) — corners and border in a group; luma, rhea, sera: its border beside buttons                                                      |
| `select-value`         | `select-value.ts`                                                                      | `select-trigger.ts` (presets) — the value's layout in the trigger (`*:data-[slot=select-value]:…`)                                                             |
| `switch`               | `switch.ts`                                                                            | `switch-field.ts` — CSS grid layout detection                                                                                                                  |
| `switch-visual`        | `switch-visual.ts`                                                                     | `switch-field.ts` — grid column positioning                                                                                                                    |

## Layout, not styling

A parent uses a child's `data-slot` **only for layout and spacing** — grid placement, gaps, alignment, layout that depends on which children are there. Each component owns its own look (colors, borders, typography, focus rings, transitions).

```typescript
// ScCheckboxField — places its children in a 2-column grid
cn(
  'grid grid-cols-[1rem_1fr] items-start gap-x-2 gap-y-1',
  '*:data-[slot=checkbox]:col-start-1 *:data-[slot=checkbox]:row-start-1',
  '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
  '*:data-[slot=field-description]:col-start-2 *:data-[slot=field-description]:row-start-2',
  // Layout that depends on a child: a bolder label when there is a description.
  'has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium',
);
```

## Consumer overrides

A slot that exists can also be used by a consumer, from a parent's `class` — an escape hatch, visible in the template:

```html
<div scCheckboxField class="*:data-[slot=label]:text-blue-600">
  <input type="checkbox" scCheckbox id="custom" />
  <label scLabel for="custom">Custom styled label</label>
</div>
```

This is a use of the slots that exist, not a reason to add one.

## The selectors

- `*:data-[slot=label]:col-start-2` — a direct child with `data-slot="label"`: `& > *[data-slot='label'] { grid-column-start: 2; }`
- `has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium` — when a direct child is the description, the label: `&:has(> [data-slot='field-description']) > *[data-slot='label'] { font-weight: 500; }`
- `in-data-[slot=input-group]:border-0` — the element itself, when inside an input group: `[data-slot='input-group'] & { border-width: 0; }`
