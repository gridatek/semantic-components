# Command Component

A fully-featured command palette component for Angular applications, providing fast search and keyboard navigation functionality.

## Overview

The Command component provides a searchable list interface with keyboard navigation, commonly used for:

- Command palettes (like VS Code's Command Palette)
- Quick search interfaces
- Action menus with filtering
- Navigation menus with search

## Components

### Core Components

- **`ScCommand`** - Main container component that manages search, filtering, and keyboard navigation
- **`ScCommandInput`** - Search input field with integrated filtering
- **`ScCommandList`** - Scrollable container for command items
- **`ScCommandItem`** - Individual selectable items with keyboard/mouse support
- **`ScCommandGroup`** - Groups related items with optional headings
- **`ScCommandGroupHeading`** - Heading text for command groups

### State Components

- **`ScCommandEmpty`** - Displayed when no search results are found
- **`ScCommandLoading`** - Loading state indicator
- **`ScCommandError`** - Error state display

### Utility Components

- **`ScCommandSeparator`** - Visual separator between groups
- **`ScCommandShortcut`** - Display keyboard shortcuts (e.g., "⌘K")
- **`ScCommandDialog`** - Service for opening commands in dialog overlays

## Features

### ✅ Implemented Features

1. **Real-time Search & Filtering**
   - Instant filtering as you type
   - Case-insensitive default search
   - Customizable filter functions
   - Automatic visibility management

2. **Keyboard Navigation**
   - **Arrow Up/Down**: Navigate through visible items
   - **Enter**: Select current item
   - **Escape**: Clear search and reset selection
   - Proper focus management and scrolling

3. **Mouse Interactions**
   - Hover to select items
   - Click to activate items
   - Visual feedback for selected state

4. **Accessibility**
   - ARIA roles and labels
   - Keyboard-only navigation
   - Screen reader support
   - Semantic HTML structure

5. **Flexible Architecture**
   - Composable components
   - Custom styling support
   - Event-driven architecture
   - TypeScript support

## Usage

### Basic Command Palette

```typescript
@Component({
  template: `
    <sc-command class="rounded-lg border shadow-md md:min-w-[450px]">
      <sc-command-input placeholder="Type a command or search..." />
      <sc-command-list>
        <sc-command-empty>No results found.</sc-command-empty>

        <sc-command-group heading="Actions">
          <sc-command-item value="new-file">
            New File
            <span sc-command-shortcut>⌘N</span>
          </sc-command-item>
          <sc-command-item value="open-file">
            Open File
            <span sc-command-shortcut>⌘O</span>
          </sc-command-item>
        </sc-command-group>

        <sc-command-separator />

        <sc-command-group heading="Navigation">
          <sc-command-item value="go-to-line">Go to Line</sc-command-item>
          <sc-command-item value="find-file">Find File</sc-command-item>
        </sc-command-group>
      </sc-command-list>
    </sc-command>
  `,
})
export class MyCommandPalette {
  onCommandSelect(value: string) {
    console.log('Selected:', value);
    // Handle command execution
  }
}
```

### Command Dialog

```typescript
@Component({
  template: `
    <button (click)="openCommandDialog()">
      Open Command Palette
      <span class="ml-auto">⌘K</span>
    </button>
  `,
})
export class MyApp {
  constructor(private commandDialog: CommandDialog) {}

  openCommandDialog() {
    const dialogRef = this.commandDialog.openTemplate(this.commandTemplate, {
      title: 'Command Palette',
      width: '600px',
      height: '400px',
    });
  }
}
```

### Custom Filter Function

```typescript
@Component({
  template: `
    <sc-command [filter]="customFilter">
      <!-- command content -->
    </sc-command>
  `,
})
export class CustomFilterExample {
  customFilter = (value: string, search: string): boolean => {
    // Custom fuzzy search logic
    return value.toLowerCase().replace(/\s/g, '').includes(search.toLowerCase().replace(/\s/g, ''));
  };
}
```

## API Reference

### ScCommand

| Input     | Type                                         | Default        | Description            |
| --------- | -------------------------------------------- | -------------- | ---------------------- |
| `class`   | `string`                                     | `''`           | Additional CSS classes |
| `loading` | `boolean`                                    | `false`        | Show loading state     |
| `empty`   | `boolean`                                    | `false`        | Show empty state       |
| `filter`  | `(value: string, search: string) => boolean` | Default filter | Custom filter function |

| Output          | Type     | Description                       |
| --------------- | -------- | --------------------------------- |
| `commandSelect` | `string` | Emitted when item is selected     |
| `queryChange`   | `string` | Emitted when search query changes |

### ScCommandItem

| Input      | Type      | Default | Description                 |
| ---------- | --------- | ------- | --------------------------- |
| `class`    | `string`  | `''`    | Additional CSS classes      |
| `value`    | `string`  | `''`    | Value emitted when selected |
| `disabled` | `boolean` | `false` | Disable item selection      |

| Output       | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| `select`     | `string` | Emitted when item is selected |
| `mouseEnter` | `void`   | Emitted on mouse hover        |

## What's Next?

### Potential Enhancements

1. **Advanced Filtering**
   - Fuzzy search algorithm
   - Search result highlighting
   - Search history
   - Recent commands tracking

2. **Enhanced Keyboard Support**
   - Tab navigation
   - Ctrl+A to select all
   - Page Up/Down navigation
   - Home/End key support

3. **Performance Optimizations**
   - Virtual scrolling for large lists
   - Debounced search input
   - Memoization for filter results
   - Lazy loading of command groups

4. **Advanced Features**
   - Command categories with icons
   - Nested command groups
   - Multi-column layouts
   - Command descriptions/tooltips
   - Contextual commands based on app state

5. **Integration Enhancements**
   - Global keyboard shortcuts service
   - Command registration system
   - Plugin architecture
   - Theme customization
   - Right-to-left (RTL) support

6. **Testing & Documentation**
   - Unit tests for all components
   - E2E tests for user interactions
   - Storybook documentation
   - Performance benchmarks

### Usage Ideas

- **Application Command Palette**: Global app actions and navigation
- **File Browser**: Quick file/folder search and actions
- **Settings Search**: Find and navigate to specific settings
- **Help System**: Searchable help topics and actions
- **Data Table Actions**: Quick actions on table rows
- **API Explorer**: Search and execute API endpoints

The command component is now production-ready with comprehensive search, navigation, and interaction capabilities!
