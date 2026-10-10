# Command Components

A command palette for fast, keyboard-driven navigation and actions.

## Architecture

```
ScCommand (root; provides SC_COMMAND; renders the list container inside ngComboboxPopup)
    │
    ├── ScCommandInputGroup (input wrapper with border)
    │     ├── Search Icon
    │     └── ScCommandInput (Combobox host directive, always expanded, role=combobox)
    │
    └── ScCommandListContainer (template marker, rendered by ScCommand after its content)
          └── ScCommandList (Listbox + ComboboxWidget, scrollable results)
                │
                ├── ScCommandEmpty (shown when no results)
                │
                ├── ScCommandGroup
                │     ├── ScCommandGroupLabel
                │     ├── ScCommandItem (Option host directive)
                │     │     └── ScCommandShortcut
                │     └── ScCommandItem
                │
                ├── ScCommandSeparator
                │
                └── ScCommandGroup
                      └── ...
```

The input is the combobox: focus stays in it while arrows move the active item (`aria-activedescendant`). `ScCommandListContainer` is a plain template marker so consumers don't have to bind `ComboboxPopup`'s required `combobox` input by hand ([angular/angular#50510](https://github.com/angular/angular/issues/50510)).

## Components

| Component                | Selector                              | Description                                         |
| ------------------------ | ------------------------------------- | --------------------------------------------------- |
| `ScCommand`              | `div[scCommand]`                      | Root; renders the list connected to the input       |
| `ScCommandInputGroup`    | `div[scCommandInputGroup]`            | Input wrapper with border                           |
| `ScCommandInput`         | `input[scCommandInput]`               | Search input (`Combobox`); `[(value)]` is the text  |
| `ScCommandListContainer` | `ng-template[scCommandListContainer]` | Marks the list template                             |
| `ScCommandList`          | `div[scCommandList]`                  | Scrollable results (`Listbox` + `ComboboxWidget`)   |
| `ScCommandEmpty`         | `div[scCommandEmpty]`                 | Shown when no results match                         |
| `ScCommandGroup`         | `div[scCommandGroup]`                 | Group of related items                              |
| `ScCommandGroupLabel`    | `[scCommandGroupLabel]`               | Group heading text                                  |
| `ScCommandItem`          | `div[scCommandItem]`                  | Command (`Option`); `(select)` fires on Enter/click |
| `ScCommandSeparator`     | `[scCommandSeparator]`                | Visual separator                                    |
| `ScCommandShortcut`      | `[scCommandShortcut]`                 | Keyboard shortcut display                           |

## Usage

### Basic Command

```html
<div scCommand class="rounded-lg border shadow-md">
  <div scCommandInputGroup>
    <svg siSearchIcon class="mr-2 size-4 shrink-0 opacity-50" aria-hidden="true"></svg>
    <input scCommandInput placeholder="Type a command..." [(value)]="searchString" />
  </div>
  <ng-template scCommandListContainer>
    <div scCommandList>
      <div scCommandEmpty>No results found.</div>
      <div scCommandGroup>
        <span scCommandGroupLabel>Actions</span>
        <div scCommandItem value="new file" label="New File" (select)="newFile()">
          <svg>...</svg>
          <span>New File</span>
          <span scCommandShortcut>⌘N</span>
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

### In a Dialog

```html
<div scDialogProvider [(open)]="open">
  <ng-template scDialogPortal>
    <div scDialog class="w-lg gap-0 p-0">
      <div scCommand>
        <div scCommandInputGroup>
          <svg siSearchIcon class="mr-2 size-4 shrink-0 opacity-50" aria-hidden="true"></svg>
          <input scCommandInput placeholder="Type a command or search..." [(value)]="searchString" />
        </div>
        <ng-template scCommandListContainer>
          <div scCommandList>
            <!-- items -->
          </div>
        </ng-template>
      </div>
    </div>
  </ng-template>
</div>
```

# Command Components

A command palette for fast, keyboard-driven navigation and actions.

## Architecture

```
ScCommand (root; provides SC_COMMAND; renders the list container inside ngComboboxPopup)
    │
    ├── ScCommandInputGroup (input wrapper with border)
    │     ├── Search Icon
    │     └── ScCommandInput (Combobox host directive, always expanded, role=combobox)
    │
    └── ScCommandListContainer (template marker, rendered by ScCommand after its content)
          └── ScCommandList (Listbox + ComboboxWidget, scrollable results)
                │
                ├── ScCommandEmpty (shown when no results)
                │
                ├── ScCommandGroup
                │     ├── ScCommandGroupLabel
                │     ├── ScCommandItem (Option host directive)
                │     │     └── ScCommandShortcut
                │     └── ScCommandItem
                │
                ├── ScCommandSeparator
                │
                └── ScCommandGroup
                      └── ...
```

The input is the combobox: focus stays in it while arrows move the active item (`aria-activedescendant`). `ScCommandListContainer` is a plain template marker so consumers don't have to bind `ComboboxPopup`'s required `combobox` input by hand ([angular/angular#50510](https://github.com/angular/angular/issues/50510)).

## Components

| Component                | Selector                              | Description                                         |
| ------------------------ | ------------------------------------- | --------------------------------------------------- |
| `ScCommand`              | `div[scCommand]`                      | Root; renders the list connected to the input       |
| `ScCommandInputGroup`    | `div[scCommandInputGroup]`            | Input wrapper with border                           |
| `ScCommandInput`         | `input[scCommandInput]`               | Search input (`Combobox`); `[(value)]` is the text  |
| `ScCommandListContainer` | `ng-template[scCommandListContainer]` | Marks the list template                             |
| `ScCommandList`          | `div[scCommandList]`                  | Scrollable results (`Listbox` + `ComboboxWidget`)   |
| `ScCommandEmpty`         | `div[scCommandEmpty]`                 | Shown when no results match                         |
| `ScCommandGroup`         | `div[scCommandGroup]`                 | Group of related items                              |
| `ScCommandGroupLabel`    | `[scCommandGroupLabel]`               | Group heading text                                  |
| `ScCommandItem`          | `div[scCommandItem]`                  | Command (`Option`); `(select)` fires on Enter/click |
| `ScCommandSeparator`     | `[scCommandSeparator]`                | Visual separator                                    |
| `ScCommandShortcut`      | `[scCommandShortcut]`                 | Keyboard shortcut display                           |

## Usage

### Basic Command

```html
<div scCommand class="rounded-lg border shadow-md">
  <div scCommandInputGroup>
    <svg siSearchIcon class="mr-2 size-4 shrink-0 opacity-50" aria-hidden="true"></svg>
    <input scCommandInput placeholder="Type a command..." [(value)]="searchString" />
  </div>
  <ng-template scCommandListContainer>
    <div scCommandList>
      <div scCommandEmpty>No results found.</div>
      <div scCommandGroup>
        <span scCommandGroupLabel>Actions</span>
        <div scCommandItem value="new file" label="New File" (select)="newFile()">
          <svg>...</svg>
          <span>New File</span>
          <span scCommandShortcut>⌘N</span>
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

### In a Dialog

```html
<div scDialogProvider [(open)]="open">
  <ng-template scDialogPortal>
    <div scDialog class="w-lg gap-0 p-0">
      <div scCommand>
        <div scCommandInputGroup>
          <svg siSearchIcon class="mr-2 size-4 shrink-0 opacity-50" aria-hidden="true"></svg>
          <input scCommandInput placeholder="Type a command or search..." [(value)]="searchString" />
        </div>
        <ng-template scCommandListContainer>
          <div scCommandList>
            <!-- items -->
          </div>
        </ng-template>
      </div>
    </div>
  </ng-template>
</div>
```

## Features

- **Angular Aria primitives**: `Combobox` (on the input), `ComboboxPopup`, `ComboboxWidget`, `Listbox`, and `Option`
- **Manual filtering**: derive the items from the input's `[(value)]`
- **Actions, not a value**: picking an item emits its `(select)` and clears the listbox selection, so the same item can be run again
- **Groups**: Organize items into logical groups with separators
- **Keyboard shortcuts**: Display shortcuts with `scCommandShortcut`
- **Empty state**: Show message when no results
- **Scrollable list**: Fixed height with overflow scroll and auto-scroll to the active item

## Keyboard Navigation

Focus always stays in the input.

| Key                     | Action               |
| ----------------------- | -------------------- |
| Printable characters    | Edit the search text |
| `ArrowDown` / `ArrowUp` | Move the active item |
| `Home` / `End`          | First / last item    |
| `Enter`                 | Run the active item  |

## ScCommandItem

| Member     | Type           | Description                                  |
| ---------- | -------------- | -------------------------------------------- |
| `value`    | `string`       | The item's value (unique within the command) |
| `label`    | `string`       | Label used for typeahead                     |
| `disabled` | `boolean`      | Disables the item                            |
| `select`   | `output<void>` | Emitted on Enter or click                    |

## Accessibility

- Built on `@angular/aria/combobox` and `@angular/aria/listbox` primitives
- The input has `role="combobox"` and `aria-activedescendant`; the list has `role="listbox"`
- Style states with `data-active="true"` (active item) and `aria-disabled="true"` (disabled item), as set by `Option`

## Known issue

`@angular/aria` 22.2.1 forwards navigation keys from the input to the list once per render (`Combobox` relays through an `afterRenderEffect`). Keys arriving within the same frame are coalesced and only the last one is applied. Normal typing is unaffected.
