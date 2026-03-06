# Command Components

A command palette for fast, keyboard-driven navigation and actions.

## Architecture

```
ScCommand (Root)
    ├── value: model<string> (search query)
    │
    ├── ScCommandInputGroup (input wrapper with border)
    │     ├── Search Icon
    │     └── ScCommandInput (search input)
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

| Component               | Selector                   | Description                    |
| ----------------------- | -------------------------- | ------------------------------ |
| `ScCommand`             | `div[scCommand]`           | Root wrapper with search state |
| `ScCommandInputGroup`   | `div[scCommandInputGroup]` | Input wrapper with border      |
| `ScCommandInput`        | `input[scCommandInput]`    | Search input                   |
| `ScCommandList`         | `div[scCommandList]`       | Scrollable results container   |
| `ScCommandEmpty`        | `div[scCommandEmpty]`      | Shown when no results match    |
| `ScCommandGroup`        | `div[scCommandGroup]`      | Group of related items         |
| `ScCommandGroupHeading` | `[scCommandGroupHeading]`  | Group heading text             |
| `ScCommandItem`         | `div[scCommandItem]`       | Individual command item        |
| `ScCommandSeparator`    | `[scCommandSeparator]`     | Visual separator               |
| `ScCommandShortcut`     | `[scCommandShortcut]`      | Keyboard shortcut display      |

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
<div scCommand class="rounded-lg border shadow-md">
  <div scCommandInputGroup>
    <svg siSearchIcon class="mr-2 size-4 shrink-0 opacity-50" aria-hidden="true"></svg>
    <input scCommandInput placeholder="Type a command..." />
  </div>
  <div scCommandList>
    <div scCommandEmpty>No results found.</div>
    <div scCommandGroup>
      <span scCommandGroupHeading>Actions</span>
      <div scCommandItem value="new file" (select)="newFile()">
        <svg>...</svg>
        <span>New File</span>
        <span scCommandShortcut>⌘N</span>
      </div>
      <div scCommandItem value="open file" (select)="openFile()">
        <svg>...</svg>
        <span>Open File</span>
        <span scCommandShortcut>⌘O</span>
      </div>
    </div>
  </div>
</div>
```

### With Multiple Groups

```html
<div scCommandList>
  <div scCommandGroup>
    <span scCommandGroupHeading>Suggestions</span>
    <div scCommandItem value="calendar">Calendar</div>
    <div scCommandItem value="calculator">Calculator</div>
  </div>
  <div scCommandSeparator></div>
  <div scCommandGroup>
    <span scCommandGroupHeading>Settings</span>
    <div scCommandItem value="profile">Profile</div>
    <div scCommandItem value="billing">Billing</div>
  </div>
</div>
```

### With Keywords for Better Search

```html
<div scCommandItem value="profile" [keywords]="['account', 'user', 'settings']" (select)="goToProfile()">Profile</div>
```

Items will match if the search query matches either the `value` or any of the `keywords`.

### In a Dialog

```html
<div scDialogProvider [(open)]="open">
  <ng-template scDialogPortal>
    <div scDialog class="p-0">
      <div scCommand>
        <div scCommandInputGroup>
          <svg siSearchIcon class="mr-2 size-4 shrink-0 opacity-50" aria-hidden="true"></svg>
          <input scCommandInput />
        </div>
        <div scCommandList>
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
- Input group: `border-b` separator with search icon
- Input: transparent background with placeholder styling
- Items: `hover:bg-accent` on hover, icons sized to `size-4`
- Shortcuts: `text-muted-foreground text-xs`
