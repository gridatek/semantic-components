# Command Components

A command palette for fast, keyboard-driven navigation and actions.

## Architecture

```
ScCommand (Root)
    ├── value: model<string> (search query)
    │
    ├── ScCommandInput (search input with icon)
    │
    └── ScCommandList (scrollable results)
          │
          ├── ScCommandEmpty (shown when no results)
          │
          ├── ScCommandGroup
          │     ├── ScCommandGroupHeading
          │     ├── ScCommandItem
          │     │     └── ScCommandShortcut
          │     └── ScCommandItem
          │
          ├── ScCommandSeparator
          │
          └── ScCommandGroup
                └── ...
```

## Components

| Component               | Selector                     | Description                    |
| ----------------------- | ---------------------------- | ------------------------------ |
| `ScCommand`             | `div[sc-command]`            | Root wrapper with search state |
| `ScCommandInput`        | `div[sc-command-input]`      | Search input with icon         |
| `ScCommandList`         | `div[sc-command-list]`       | Scrollable results container   |
| `ScCommandEmpty`        | `div[sc-command-empty]`      | Shown when no results match    |
| `ScCommandGroup`        | `div[sc-command-group]`      | Group of related items         |
| `ScCommandGroupHeading` | `[sc-command-group-heading]` | Group heading text             |
| `ScCommandItem`         | `div[sc-command-item]`       | Individual command item        |
| `ScCommandSeparator`    | `[sc-command-separator]`     | Visual separator               |
| `ScCommandShortcut`     | `[sc-command-shortcut]`      | Keyboard shortcut display      |

## Inputs

### ScCommandInput

| Input         | Type     | Default       | Description            |
| ------------- | -------- | ------------- | ---------------------- |
| `placeholder` | `string` | `'Search...'` | Input placeholder text |

### ScCommandItem

| Input      | Type       | Default | Description                    |
| ---------- | ---------- | ------- | ------------------------------ |
| `value`    | `string`   | `''`    | Searchable value for filtering |
| `keywords` | `string[]` | `[]`    | Additional search keywords     |
| `disabled` | `boolean`  | `false` | Whether item is disabled       |
| `selected` | `boolean`  | `false` | Whether item is selected       |

## Outputs

### ScCommandItem

| Output   | Type   | Description                  |
| -------- | ------ | ---------------------------- |
| `select` | `void` | Emitted when item is clicked |

## Usage

### Basic Command

```html
<div sc-command class="rounded-lg border shadow-md">
  <div sc-command-input placeholder="Type a command..." />
  <div sc-command-list>
    <div sc-command-empty>No results found.</div>
    <div sc-command-group>
      <span sc-command-group-heading>Actions</span>
      <div sc-command-item value="new file" (select)="newFile()">
        <svg>...</svg>
        <span>New File</span>
        <span sc-command-shortcut>⌘N</span>
      </div>
      <div sc-command-item value="open file" (select)="openFile()">
        <svg>...</svg>
        <span>Open File</span>
        <span sc-command-shortcut>⌘O</span>
      </div>
    </div>
  </div>
</div>
```

### With Multiple Groups

```html
<div sc-command-list>
  <div sc-command-group>
    <span sc-command-group-heading>Suggestions</span>
    <div sc-command-item value="calendar">Calendar</div>
    <div sc-command-item value="calculator">Calculator</div>
  </div>
  <div sc-command-separator></div>
  <div sc-command-group>
    <span sc-command-group-heading>Settings</span>
    <div sc-command-item value="profile">Profile</div>
    <div sc-command-item value="billing">Billing</div>
  </div>
</div>
```

### With Keywords for Better Search

```html
<div sc-command-item value="profile" [keywords]="['account', 'user', 'settings']" (select)="goToProfile()">Profile</div>
```

Items will match if the search query matches either the `value` or any of the `keywords`.

### In a Dialog

```html
<div sc-dialog-provider [(open)]="open">
  <ng-template scDialogPortal>
    <div sc-dialog class="p-0">
      <div sc-command>
        <div sc-command-input />
        <div sc-command-list>
          <!-- items -->
        </div>
      </div>
    </div>
  </ng-template>
</div>
```

## Features

- **Real-time filtering**: Items filter as you type
- **Keyword search**: Match by value or additional keywords
- **Groups**: Organize items into logical groups
- **Keyboard shortcuts**: Display shortcuts with `sc-command-shortcut`
- **Empty state**: Show message when no results
- **Scrollable list**: Fixed height with overflow scroll

## Accessibility

- Uses `role="listbox"` on the list
- Uses `role="option"` on items
- Uses `role="group"` on groups
- Uses `role="separator"` on separators
- `data-disabled` and `data-selected` attributes

## Styling

The components use Tailwind CSS with shadcn/ui design tokens:

- Container: `bg-popover text-popover-foreground rounded-md`
- Input: `border-b` separator with search icon
- Items: `hover:bg-accent` on hover, icons sized to `size-4`
- Shortcuts: `text-muted-foreground text-xs`
