# New Tabs

A set of wrapper directives for Angular ARIA's tabs components that include built-in styling, following shadcn/ui design patterns.

## Overview

These wrapper directives provide a cleaner, more opinionated implementation of Angular ARIA tabs with pre-configured styles. They eliminate the need to repeat CSS classes across your application.

## Architecture

The tabs system is split into semantic components with distinct responsibilities:

- **ScNewTabs**: Container that manages the overall tabs context
- **ScNewTabList**: Container for tab buttons with built-in styling
- **ScNewTab**: Individual tab button with hover and selection states
- **ScNewTabPanel**: Panel container for tab content
- **ScNewTabContent**: Template directive for lazy-loaded content

All components include `data-slot` attributes for programmatic identification and testing.

## Components

### ScNewTabs

Wraps `@angular/aria/tabs`'s `Tabs` directive.

**Features:**

- Manages overall tabs context and coordination
- Includes `data-slot="tabs"` for identification

**Usage:**

```html
<div scNewTabs>
  <!-- Tab list and panels -->
</div>
```

### ScNewTabList

Wraps `@angular/aria/tabs`'s `TabList` directive with built-in styling.

**Features:**

- Styled container for tab buttons
- Forwards Angular ARIA inputs: `orientation`, `wrap`, `softDisabled`, `focusMode`, `selectionMode`, `selectedTab`, `disabled`
- Forwards `selectedTabChange` output
- Includes `data-slot="tab-list"` for identification
- Accepts `class` input for style customization

**Usage:**

```html
<div scNewTabList [selectedTab]="'account'">
  <button scNewTab value="account">Account</button>
  <button scNewTab value="password">Password</button>
</div>
```

### ScNewTab

Wraps `@angular/aria/tabs`'s `Tab` directive with button styling.

**Features:**

- Styled tab button with hover and selection states
- Forwards Angular ARIA inputs: `id`, `disabled`, `value`
- Includes `data-slot="tab"` for identification
- Accepts `class` input for style customization
- Uses `aria-selected` attribute for active state styling

**Usage:**

```html
<button scNewTab value="account">Account</button>
```

### ScNewTabPanel

Wraps `@angular/aria/tabs`'s `TabPanel` directive with spacing.

**Features:**

- Container for panel content with top margin
- Forwards Angular ARIA inputs: `id`, `value`
- Includes `data-slot="tab-panel"` for identification
- Accepts `class` input for style customization

**Usage:**

```html
<div scNewTabPanel value="account">
  <ng-template scNewTabContent>
    <!-- Panel content -->
  </ng-template>
</div>
```

### ScNewTabContent

Wraps `@angular/aria/tabs`'s `TabContent` directive for lazy loading.

**Features:**

- Enables lazy loading of tab panel content
- Content is only rendered when tab is first activated
- Includes `data-slot="tab-content"` for identification

**Usage:**

```html
<ng-template scNewTabContent>
  <p>This content will be loaded when the tab is first selected.</p>
</ng-template>
```

## Complete Example

```typescript
import {
  ScNewTab,
  ScNewTabContent,
  ScNewTabList,
  ScNewTabPanel,
  ScNewTabs,
} from '@semantic-components/ui';

@Component({
  selector: 'app-settings',
  imports: [ScNewTabs, ScNewTabList, ScNewTab, ScNewTabPanel, ScNewTabContent],
  template: `
    <div scNewTabs>
      <div [selectedTab]="'account'" scNewTabList>
        <button scNewTab value="account">Account</button>
        <button scNewTab value="password">Password</button>
      </div>

      <div scNewTabPanel value="account">
        <ng-template scNewTabContent>
          <h2>Account Settings</h2>
          <p>Manage your account settings here.</p>
        </ng-template>
      </div>

      <div scNewTabPanel value="password">
        <ng-template scNewTabContent>
          <h2>Password Settings</h2>
          <p>Change your password here.</p>
        </ng-template>
      </div>
    </div>
  `,
})
export class SettingsComponent {}
```

## Tab List Layouts

### Inline Tabs (Default)

Tabs are displayed inline with automatic width:

```html
<div scNewTabList [selectedTab]="'tab1'">
  <button scNewTab value="tab1">Tab 1</button>
  <button scNewTab value="tab2">Tab 2</button>
  <button scNewTab value="tab3">Tab 3</button>
</div>
```

### Full Width Grid Tabs

Use grid layout for evenly distributed tabs:

```html
<div class="grid w-full grid-cols-2" scNewTabList [selectedTab]="'tab1'">
  <button scNewTab value="tab1">Tab 1</button>
  <button scNewTab value="tab2">Tab 2</button>
</div>
```

## Accessibility Features

All Angular ARIA accessibility features are preserved:

- **ARIA Attributes**: Automatically manages `aria-selected`, `aria-controls`, and `role` attributes
- **Keyboard Navigation**:
  - Arrow keys to move between tabs
  - Home/End to jump to first/last tab
  - Space/Enter to select tabs (when using explicit selection mode)
- **Focus Management**: Proper focus handling with roving tabindex or activedescendant
- **Selection Modes**:
  - `follow`: Tab is selected when focused (default)
  - `explicit`: Tab must be explicitly activated (click or Space/Enter)

## Comparison with Raw Angular ARIA

### Before (Raw Angular ARIA)

```html
<div ngTabs>
  <div
    class="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
    ngTabList
    [selectedTab]="'account'"
  >
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow"
      ngTab
      value="account"
    >
      Account
    </button>
  </div>

  <div class="mt-2" ngTabPanel value="account">
    <ng-template ngTabContent>Content here</ng-template>
  </div>
</div>
```

### After (With Wrappers)

```html
<div scNewTabs>
  <div scNewTabList [selectedTab]="'account'">
    <button scNewTab value="account">Account</button>
  </div>

  <div scNewTabPanel value="account">
    <ng-template scNewTabContent>Content here</ng-template>
  </div>
</div>
```

**Benefits:**

- Less boilerplate HTML
- Cleaner template structure
- Consistent styling across application
- `data-slot` attributes for easier testing and debugging

## Technical Implementation

These wrappers use Angular's `hostDirectives` feature to compose the original Angular ARIA directives with pre-configured host bindings:

```typescript
@Directive({
  selector: 'button[scNewTab]',
  hostDirectives: [
    {
      directive: Tab,
      inputs: ['id', 'disabled', 'value'],
    },
  ],
  host: {
    'data-slot': 'tab',
    '[class]': 'class()',
  },
})
export class ScNewTab {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('...default classes...', this.classInput()));
}
```

This approach ensures:

- Full compatibility with Angular ARIA
- Zero runtime overhead
- Type-safe input forwarding
- Flexible styling control
- Clear component identification
