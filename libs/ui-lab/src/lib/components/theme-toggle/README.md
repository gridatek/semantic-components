# Theme Toggle

A component for switching between light and dark themes with system preference support.

## Usage

### Basic Toggle Button

The theme toggle uses content projection for icons, following the declarative architecture pattern.

```typescript
import { ScThemeToggle } from '@semantic-components/ui-lab';
import { SiMoonIcon, SiSunIcon } from '@semantic-icons/lucide-icons';

@Component({
  imports: [ScThemeToggle, SiSunIcon, SiMoonIcon],
  template: `
    <button scThemeToggle #toggle="scThemeToggle">
      @if (toggle.isDark()) {
        <svg si-sun-icon></svg>
      } @else {
        <svg si-moon-icon></svg>
      }
    </button>
  `,
})
export class MyComponent {}
```

### With Variants

```html
<!-- Default variant -->
<button scThemeToggle variant="default" #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg si-sun-icon></svg>
  } @else {
  <svg si-moon-icon></svg>
  }
</button>

<!-- Outline variant -->
<button scThemeToggle variant="outline" #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg si-sun-icon></svg>
  } @else {
  <svg si-moon-icon></svg>
  }
</button>

<!-- Ghost variant -->
<button scThemeToggle variant="ghost" #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg si-sun-icon></svg>
  } @else {
  <svg si-moon-icon></svg>
  }
</button>
```

### With Sizes

```html
<button scThemeToggle size="sm" #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg si-sun-icon></svg>
  } @else {
  <svg si-moon-icon></svg>
  }
</button>
```

### Theme Select Dropdown

The theme select follows the composable pattern - consumers provide the label and connect it with IDs.

```typescript
import { ScThemeField, ScThemeSelect } from '@semantic-components/ui-lab';

@Component({
  imports: [ScThemeField, ScThemeSelect],
  template: `
    <div scThemeField>
      <label class="text-sm font-medium">Theme</label>
      <select scThemeSelect>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  `,
})
export class MyComponent {}
```

With translations:

```html
<div scThemeField>
  <label>Thème</label>
  <select scThemeSelect>
    <option value="light">Lumière</option>
    <option value="dark">Sombre</option>
    <option value="system">Système</option>
  </select>
</div>
```

Without ScThemeField (custom layout, manual IDs):

```html
<div class="custom-layout">
  <label for="my-theme">Choose theme</label>
  <select scThemeSelect id="my-theme">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="system">System</option>
  </select>
</div>
```

### Using ScTheme Directly

```typescript
import { ScTheme } from '@semantic-components/ui-lab';

export class MyComponent {
  private theme = inject(ScTheme);

  // Read the current theme
  currentTheme = this.theme.theme;

  // Check if dark mode is active
  isDark = this.theme.isDark;

  // Set a specific theme
  setDark() {
    this.theme.setTheme('dark');
  }

  // Toggle between light and dark
  toggle() {
    this.theme.toggleTheme();
  }
}
```

## Components

### ScThemeToggle

A button that toggles between light and dark themes. Uses content projection for icons following the declarative architecture pattern.

**Selector:** `button[scThemeToggle]`

**Export As:** `scThemeToggle`

**Inputs:**

| Input     | Type                 | Default   | Description            |
| --------- | -------------------- | --------- | ---------------------- |
| `variant` | `ThemeToggleVariant` | `'ghost'` | Visual style variant   |
| `size`    | `ThemeToggleSize`    | `'icon'`  | Button size            |
| `class`   | `string`             | `''`      | Additional CSS classes |

**Variants:** `'default'` | `'outline'` | `'ghost'`

**Sizes:** `'default'` | `'sm'` | `'lg'` | `'icon'`

**Public Properties (via template reference):**

| Property | Type              | Description                  |
| -------- | ----------------- | ---------------------------- |
| `isDark` | `Signal<boolean>` | Whether dark theme is active |

**Usage:**

Use a template reference variable with `#toggle="scThemeToggle"` to access the `isDark()` signal for conditional icon rendering.

### ScThemeSelect

A dropdown select for choosing between light, dark, and system themes. Follows the composable pattern - consumers provide the label, options, and IDs for full control and i18n support.

**Selector:** `select[scThemeSelect]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Options:**

Consumers must provide the option elements via content projection. The values must be `'light'`, `'dark'`, or `'system'`.

```html
<option value="light">Light</option>
<option value="dark">Dark</option>
<option value="system">System</option>
```

### ScThemeField

A container component for theme select with consistent spacing and automatic ID management.

**Selector:** `div[scThemeField]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Behavior:**

Automatically generates a unique ID and applies it to the label's `for` attribute and the select's `id` attribute, ensuring proper accessibility without manual ID management.

## ScTheme

A singleton service for managing theme state.

**Properties:**

| Property        | Type                        | Description                                       |
| --------------- | --------------------------- | ------------------------------------------------- |
| `theme`         | `Signal<Theme>`             | Current theme setting ('light', 'dark', 'system') |
| `resolvedTheme` | `Signal<'light' \| 'dark'>` | Actual applied theme (resolves 'system')          |
| `isDark`        | `Signal<boolean>`           | Whether dark theme is currently active            |

**Methods:**

| Method        | Parameters     | Description                   |
| ------------- | -------------- | ----------------------------- |
| `setTheme`    | `theme: Theme` | Set the theme explicitly      |
| `toggleTheme` | none           | Toggle between light and dark |

## Architecture

This component follows the **declarative architecture** pattern:

- **Content Projection**: Icons are provided by consumers via `<ng-content />`, not embedded in the component
- **Template References**: Use `#toggle="scThemeToggle"` to access component state in templates
- **Signal-based State**: The `isDark()` signal drives conditional rendering
- **No Imperative Methods**: All state changes happen through user interactions, not programmatic calls

This design gives consumers full control over icon presentation while maintaining clean separation of concerns.

## Accessibility

- The toggle button uses `aria-label` to describe the action
- The toggle button uses `aria-pressed` to indicate the current state
- The select dropdown includes a screen-reader-only label
- Icons are marked with `aria-hidden="true"`
- Full keyboard navigation support

## Persistence

The theme preference is automatically persisted to `localStorage` under the key `sc-theme` and restored on page load.
