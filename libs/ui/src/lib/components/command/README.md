# Command Components

A command palette for fast, keyboard-driven navigation and actions.

## Architecture

```
ScCommand (Root - Combobox host directive)
    │
    ├── ScCommandInputGroup (input wrapper with border)
    │     ├── Search Icon
    │     └── ScCommandInput (ComboboxInput host directive)
    │
    └── ScCommandListContainer (ComboboxPopupContainer host directive)
          └── ScCommandList (Listbox host directive, scrollable results)
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

## Components

| Component                | Selector                              | Description                      |
| ------------------------ | ------------------------------------- | -------------------------------- |
| `ScCommand`              | `div[scCommand]`                      | Root wrapper (Combobox)          |
| `ScCommandInputGroup`    | `div[scCommandInputGroup]`            | Input wrapper with border        |
| `ScCommandInput`         | `input[scCommandInput]`               | Search input (ComboboxInput)     |
| `ScCommandListContainer` | `ng-template[scCommandListContainer]` | Popup container template         |
| `ScCommandList`          | `div[scCommandList]`                  | Scrollable results (Listbox)     |
| `ScCommandEmpty`         | `div[scCommandEmpty]`                 | Shown when no results match      |
| `ScCommandGroup`         | `div[scCommandGroup]`                 | Group of related items           |
| `ScCommandGroupLabel`    | `[scCommandGroupLabel]`               | Group heading text               |
| `ScCommandItem`          | `div[scCommandItem]`                  | Individual command item (Option) |
| `ScCommandSeparator`     | `[scCommandSeparator]`                | Visual separator                 |
| `ScCommandShortcut`      | `[scCommandShortcut]`                 | Keyboard shortcut display        |

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
      <div scCommand class="**:data-[slot=command-input-group]:h-12">
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

- **Angular Aria primitives**: Uses `Combobox`, `ComboboxInput`, `ComboboxPopupContainer`, `Listbox`, and `Option` host directives
- **Manual filtering**: `filterMode='manual'` and `alwaysExpanded=true` set by default on `ScCommand`
- **Real-time filtering**: Items filter as you type via signal-based search
- **Groups**: Organize items into logical groups with separators
- **Keyboard shortcuts**: Display shortcuts with `scCommandShortcut`
- **Empty state**: Show message when no results
- **Scrollable list**: Fixed height with overflow scroll and auto-scroll to active item

## Accessibility

- Built on `@angular/aria/combobox` and `@angular/aria/listbox` primitives
- Proper ARIA roles and attributes managed by host directives
- Keyboard navigation support
- `data-disabled` and `data-selected` attributes for styling states
