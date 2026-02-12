# ScTabs Components

A set of Angular components that wrap `@angular/aria/tabs` directives with shadcn/ui styling.

## Architecture

The components use `hostDirectives` to leverage Angular ARIA's accessible tabs implementation while providing custom styling.

```
ScTabs (root wrapper)
└── ScTabList (tablist container)
    ├── ScTab (tab button)
    ├── ScTab
    └── ...
└── ScTabPanel (tab panel content)
└── ScTabPanel
└── ...
```

## Components

| Component    | Selector            | Host Directive | Description                    |
| ------------ | ------------------- | -------------- | ------------------------------ |
| `ScTabs`     | `div[sc-tabs]`      | `Tabs`         | Root wrapper for tabs          |
| `ScTabList`  | `div[sc-tab-list]`  | `TabList`      | Container for tab buttons      |
| `ScTab`      | `button[sc-tab]`    | `Tab`          | Button to activate a tab panel |
| `ScTabPanel` | `div[sc-tab-panel]` | `TabPanel`     | Content panel for each tab     |

## Inputs

### ScTabList

| Input           | Type                         | Default        | Description                      |
| --------------- | ---------------------------- | -------------- | -------------------------------- |
| `selectedTab`   | `string`                     | `''`           | The currently selected tab value |
| `selectionMode` | `'follow' \| 'explicit'`     | `'follow'`     | Tab activation behavior on focus |
| `orientation`   | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab list direction               |

### ScTab

| Input      | Type      | Default      | Description                       |
| ---------- | --------- | ------------ | --------------------------------- |
| `value`    | `string`  | **required** | Unique value identifying this tab |
| `disabled` | `boolean` | `false`      | Whether the tab is disabled       |

### ScTabPanel

| Input             | Type      | Default      | Description                          |
| ----------------- | --------- | ------------ | ------------------------------------ |
| `value`           | `string`  | **required** | Value matching the corresponding tab |
| `preserveContent` | `boolean` | `false`      | Retains DOM when panel is hidden     |

## Usage

### Basic Tabs

```html
<div sc-tabs>
  <div sc-tab-list selectedTab="tab1">
    <button sc-tab value="tab1">Tab 1</button>
    <button sc-tab value="tab2">Tab 2</button>
    <button sc-tab value="tab3">Tab 3</button>
  </div>
  <div sc-tab-panel value="tab1">Content for Tab 1</div>
  <div sc-tab-panel value="tab2">Content for Tab 2</div>
  <div sc-tab-panel value="tab3">Content for Tab 3</div>
</div>
```

### Selection Modes

```html
<!-- Follow mode (default): tabs activate immediately on focus -->
<div sc-tab-list selectionMode="follow" selectedTab="account">
  <button sc-tab value="account">Account</button>
  <button sc-tab value="password">Password</button>
</div>

<!-- Explicit mode: requires Space/Enter to activate focused tabs -->
<div sc-tab-list selectionMode="explicit" selectedTab="account">
  <button sc-tab value="account">Account</button>
  <button sc-tab value="password">Password</button>
</div>
```

### With Disabled Tab

```html
<div sc-tab-list selectedTab="active">
  <button sc-tab value="active">Active Tab</button>
  <button sc-tab value="disabled" disabled>Disabled</button>
</div>
```

### Vertical Tabs

```html
<div sc-tabs class="flex gap-4">
  <div sc-tab-list orientation="vertical" selectedTab="tab1" class="flex-col">
    <button sc-tab value="tab1">Tab 1</button>
    <button sc-tab value="tab2">Tab 2</button>
  </div>
  <div class="flex-1">
    <div sc-tab-panel value="tab1">Content 1</div>
    <div sc-tab-panel value="tab2">Content 2</div>
  </div>
</div>
```

### Full Width Tabs

```html
<div sc-tab-list class="grid w-full grid-cols-3" selectedTab="tab1">
  <button sc-tab value="tab1">Tab 1</button>
  <button sc-tab value="tab2">Tab 2</button>
  <button sc-tab value="tab3">Tab 3</button>
</div>
```

### Preserve Content (Lazy Loading)

```html
<!-- Content is destroyed when hidden (default) -->
<div sc-tab-panel value="tab1">Heavy content here</div>

<!-- Content is preserved when hidden -->
<div sc-tab-panel value="tab1" [preserveContent]="true">Heavy content that persists in DOM</div>
```

## Keyboard Navigation

| Key               | Action                                            |
| ----------------- | ------------------------------------------------- |
| `ArrowLeft`       | Move focus to previous tab                        |
| `ArrowRight`      | Move focus to next tab                            |
| `ArrowUp`         | Move focus to previous tab (vertical orientation) |
| `ArrowDown`       | Move focus to next tab (vertical orientation)     |
| `Home`            | Move focus to first tab                           |
| `End`             | Move focus to last tab                            |
| `Space` / `Enter` | Activate focused tab (explicit mode only)         |
| `Tab`             | Move focus to the active tab panel                |

## Accessibility

- Full ARIA tabs pattern implementation via `@angular/aria/tabs`
- Proper `role="tablist"`, `role="tab"`, and `role="tabpanel"` attributes
- `aria-selected` state management on tabs
- Automatic `aria-controls` and `aria-labelledby` linking
- Roving tabindex for keyboard navigation
- RTL language support

## Styling

The components use Tailwind CSS with shadcn/ui design tokens:

- List: `bg-muted rounded-lg p-1`
- Active tab: `bg-background text-foreground shadow`
- Inactive tab: `text-muted-foreground`
- Focus ring on keyboard navigation

All components accept a `class` input for custom styling:

```html
<div sc-tab-list class="w-full">
  <!-- full width tab list -->
</div>

<button sc-tab value="special" class="font-bold">Special Tab</button>
```
