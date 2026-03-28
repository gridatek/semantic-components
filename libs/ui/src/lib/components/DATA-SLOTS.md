# Data Slots

`data-slot` is an optional attribute used by some components for CSS-based layout detection. It is **not mandatory** — only add it when a parent or sibling component needs to detect the presence or position of a child element via CSS selectors like `has-[>`, `*:data-[slot=`, or `in-data-[slot=`.

## When to use `data-slot`

Add `data-slot` to a component only when another component references it in its styles. Common patterns:

- **`has-[>[data-slot=X]]`** — parent detects if child X exists to adjust layout (e.g., card-header adds a grid column when card-action is present)
- **`*:data-[slot=X]`** — parent targets child X for positioning (e.g., checkbox-field positions the label and description in a CSS grid)
- **`in-data-[slot=X]`** — child detects it's inside parent X and adjusts its own styles (e.g., input strips borders when inside input-group)

## When NOT to use `data-slot`

Do not add `data-slot` as a convention or for identification purposes. If no component references the value in its styles, it should not exist.

## Active data-slots

The following `data-slot` values are currently in use:

| data-slot              | Declared in                                                                            | Referenced by                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `alert-action`         | `alert-action.ts`                                                                      | `alert.ts` — adds right padding when action exists                                                  |
| `alert-description`    | `alert-description.ts`                                                                 | `alert.ts` — styles description in destructive variant                                              |
| `alert-dialog-media`   | `alert-dialog-media.ts`                                                                | `alert-dialog-header.ts`, `alert-dialog-title.ts` — switches grid layout                            |
| `avatar`               | `avatar.ts`                                                                            | `avatar-group.ts` — adds ring to avatars in a group                                                 |
| `button-group`         | `button-group.ts`                                                                      | `button.ts`, `button-group.ts` — adjusts border-radius for grouped buttons                          |
| `card-action`          | `card-action.ts`                                                                       | `card-header.ts` — switches header to 2-column grid                                                 |
| `card-description`     | `card-description.ts`                                                                  | `card-header.ts` — adds extra grid row                                                              |
| `card-footer`          | `card-footer.ts`                                                                       | `card.ts` — removes bottom padding                                                                  |
| `checkbox`             | `checkbox.ts`                                                                          | `checkbox-field.ts` — grid positioning                                                              |
| `checkbox-visual`      | `checkbox-visual.ts`                                                                   | `checkbox-field.ts` — grid positioning                                                              |
| `command-group-label`  | `command-group-label.ts`                                                               | `command-group.ts` — styles nested label                                                            |
| `context-menu`         | `context-menu.ts`                                                                      | `context-menu.ts` (CSS) — positions menu panel                                                      |
| `control`              | `input.ts`, `textarea.ts`, `combobox-display-value.ts`, `multiselect-display-value.ts` | `input-group.ts` — detects focus/invalid state on control                                           |
| `field`                | `field.ts`                                                                             | `label.ts`, `field.ts`, `checkbox-field.ts`, `radio-field.ts`, `switch-field.ts` — layout detection |
| `field-body`           | `field-body.ts`                                                                        | `field.ts` — adjusts alignment                                                                      |
| `field-description`    | `field-description.ts`                                                                 | `checkbox-field.ts`, `radio-field.ts`, `switch-field.ts` — bold label, grid positioning             |
| `field-group`          | `field-group.ts`                                                                       | `field-group.ts` — nested group gap                                                                 |
| `input-group`          | `input-group.ts`                                                                       | `input.ts`, `textarea.ts`, `input-group.ts` — strips borders/rings inside group                     |
| `item-body`            | `item-body.ts`                                                                         | `item-body.ts` — second body gets `flex-none`                                                       |
| `item-description`     | `item-description.ts`                                                                  | `item-media.ts` — aligns media to top                                                               |
| `label`                | `label.ts`                                                                             | `checkbox-field.ts`, `radio-field.ts`, `field.ts` — grid positioning, font-weight                   |
| `label-text`           | `label-text.ts`                                                                        | `switch-field.ts` — grid column positioning                                                         |
| `menu`                 | `menu.ts`                                                                              | `context-menu.ts` (CSS) — positions menu panel                                                      |
| `navigation-menu-link` | `navigation-menu-link.ts`                                                              | `navigation-menu-content.ts` — removes focus ring                                                   |
| `radio`                | `radio.ts`                                                                             | `radio-field.ts`, `fieldset.ts` — grid positioning                                                  |
| `radio-group`          | `radio-group.ts`                                                                       | `fieldset.ts` — reduces gap                                                                         |
| `switch`               | `switch.ts`                                                                            | `switch-field.ts` — CSS grid layout detection                                                       |
| `switch-visual`        | `switch-visual.ts`                                                                     | `switch-field.ts` — grid column positioning                                                         |
