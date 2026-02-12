# Declarative Architecture Pattern

This guide explains the declarative architecture pattern used in Semantic Components, where UI state is controlled through template bindings rather than imperative method calls.

## Philosophy

Semantic Components embraces a **declarative, state-driven approach** to UI development. Instead of calling methods like `dialog.open()` or `modal.show()`, you control component visibility and behavior through template bindings and signals.

### Imperative vs Declarative

**Imperative (Traditional):**

```typescript
// Component class
export class MyComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { message: 'Hello' },
    });
  }
}
```

```html
<!-- Template -->
<button (click)="openDialog()">Open Dialog</button>
```

**Problems with Imperative:**

- Logic hidden in component class
- Hard to see what's rendered from template alone
- State management scattered across files
- Testing requires mocking services
- Not reactive by default

**Declarative (Semantic Components):**

```typescript
// Component class
export class MyComponent {
  readonly dialogOpen = signal(false);
  readonly message = signal('Hello');
}
```

```html
<!-- Template -->
<button (click)="dialogOpen.set(true)">Open Dialog</button>

<div sc-dialog [open]="dialogOpen()">
  <div sc-dialog-content>{{ message() }}</div>
</div>
```

**Benefits of Declarative:**

- ✅ All UI visible in template
- ✅ State-driven, reactive by default
- ✅ Easy to understand at a glance
- ✅ Testable without mocking
- ✅ Works naturally with signals

## Core Principles

### 1. State Controls UI

Components don't have `.open()`, `.show()`, or `.close()` methods. Instead, they accept an `[open]` input that controls visibility:

```html
<!-- Dialog -->
<div sc-dialog [open]="isDialogOpen()">
  <div sc-dialog-content>Content</div>
</div>

<!-- Sheet -->
<div sc-sheet [open]="isSheetOpen()">
  <div sc-sheet-content>Content</div>
</div>

<!-- Popover -->
<div sc-popover [open]="isPopoverOpen()">
  <div sc-popover-content>Content</div>
</div>
```

### 2. Template-Visible State

Everything rendered should be visible in the template:

**Good:**

```html
@if (showDialog()) {
<div sc-dialog [open]="true">
  <div sc-dialog-content>{{ dialogMessage() }}</div>
</div>
}
```

**Bad:**

```typescript
// Hidden in component class
openDialog(message: string) {
  this.dialogService.open({ message });
}
```

### 3. Signals for Reactivity

Use signals for UI state so updates are automatic and trackable:

```typescript
export class MyComponent {
  // State
  readonly isOpen = signal(false);
  readonly data = signal<string[]>([]);

  // Derived state
  readonly hasData = computed(() => this.data().length > 0);

  // Actions
  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
```

```html
<div sc-dialog [open]="isOpen()">
  <div sc-dialog-header>Data</div>
  <div sc-dialog-content>
    @if (hasData()) {
    <ul>
      @for (item of data(); track item) {
      <li>{{ item }}</li>
      }
    </ul>
    } @else {
    <p>No data</p>
    }
  </div>
  <div sc-dialog-footer>
    <button (click)="close()">Close</button>
  </div>
</div>
```

## Real-World Example: Theme Toggle

### The Challenge

The `ScThemeToggle` component needs to display different icons based on the current theme (sun for light mode, moon for dark mode).

### Imperative Solution (Not Used)

```typescript
@Component({
  selector: 'button[sc-theme-toggle]',
  template: `
    <svg *ngIf="isDark"><!-- Sun icon --></svg>
    <svg *ngIf="!isDark"><!-- Moon icon --></svg>
  `,
})
export class ScThemeToggle {
  isDark = signal(false);

  toggle() {
    this.isDark.update((v) => !v);
  }
}
```

**Usage:**

```html
<button sc-theme-toggle></button>
```

**Problem:** The consumer has no control over the icons. The template is hidden inside the component.

### Declarative Solution (Semantic Components)

```typescript
@Component({
  selector: 'button[sc-theme-toggle]',
  exportAs: 'scThemeToggle',
  template: `
    <ng-content />
  `,
  host: {
    '(click)': 'toggle()',
  },
})
export class ScThemeToggle {
  readonly isDark = signal(false);

  toggle() {
    this.isDark.update((v) => !v);
  }
}
```

**Usage:**

```html
<button sc-theme-toggle #themeToggle="scThemeToggle">
  @if (themeToggle.isDark()) {
  <svg><!-- Sun icon --></svg>
  } @else {
  <svg><!-- Moon icon --></svg>
  }
</button>
```

**Benefits:**

- ✅ Consumer controls the icons
- ✅ Template shows exactly what renders
- ✅ Easy to customize (use different icons, add text, etc.)
- ✅ No ESLint errors (button has content)
- ✅ Follows composable principle

### Advanced Usage

**With Custom Icons:**

```html
<button sc-theme-toggle #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg si-sun-icon class="size-5"></svg>
  } @else {
  <svg si-moon-icon class="size-5"></svg>
  }
</button>
```

**With Text:**

```html
<button sc-theme-toggle #toggle="scThemeToggle" class="gap-2">
  @if (toggle.isDark()) {
  <svg si-sun-icon></svg>
  <span>Light</span>
  } @else {
  <svg si-moon-icon></svg>
  <span>Dark</span>
  }
</button>
```

**With Custom Logic:**

```html
<button sc-theme-toggle #toggle="scThemeToggle">
  @switch (theme()) { @case ('light') {
  <svg si-sun-icon></svg>
  } @case ('dark') {
  <svg si-moon-icon></svg>
  } @case ('auto') {
  <svg si-monitor-icon></svg>
  } }
</button>
```

## Pattern Guidelines

### When to Use Content Projection

Use `<ng-content />` when:

- Component content varies by use case
- Users need customization
- Content is visual (icons, text, layouts)

```typescript
@Component({
  template: `
    <ng-content />
  `,
})
export class ScButton {}
```

### When to Use Template Reference Variables

Use `exportAs` and template references to expose component state:

```typescript
@Component({
  selector: 'button[sc-theme-toggle]',
  exportAs: 'scThemeToggle', // 👈 Export as
})
export class ScThemeToggle {
  readonly isDark = signal(false); // 👈 Public state
}
```

```html
<button sc-theme-toggle #toggle="scThemeToggle">{{ toggle.isDark() ? 'Light' : 'Dark' }}</button>
```

### When to Make Properties Public

Make properties `readonly` and public if consumers need access:

```typescript
export class ScThemeToggle {
  // ✅ Public - consumers can access
  readonly isDark = signal(false);

  // ❌ Private - internal only
  private readonly _subscription = new Subscription();

  // ✅ Protected - for internal use and testing
  protected readonly ariaLabel = computed(() => (this.isDark() ? 'Switch to light theme' : 'Switch to dark theme'));
}
```

## Comparison: Dialog Component

### Imperative (Angular Material)

```typescript
export class MyComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.confirm();
      }
    });
  }
}
```

### Declarative (Semantic Components)

```typescript
export class MyComponent {
  readonly dialogOpen = signal(false);
  readonly message = signal('Are you sure?');

  confirm() {
    // Confirmation logic
    this.dialogOpen.set(false);
  }
}
```

```html
<button (click)="dialogOpen.set(true)">Open</button>

<div sc-dialog [open]="dialogOpen()">
  <div sc-dialog-header>Confirm</div>
  <div sc-dialog-content>{{ message() }}</div>
  <div sc-dialog-footer>
    <button (click)="dialogOpen.set(false)">Cancel</button>
    <button (click)="confirm()">Confirm</button>
  </div>
</div>
```

**Advantages:**

- Template-first: All UI in one place
- No service injection needed
- Type-safe: No `any` casting for dialog data
- Testable: Just check signal values
- Reactive: Changes propagate automatically

## Best Practices

### 1. Keep State in Signals

```typescript
// ✅ Good
readonly isOpen = signal(false);
readonly count = signal(0);

// ❌ Bad
isOpen = false;
count = 0;
```

### 2. Use Computed for Derived State

```typescript
// ✅ Good
readonly hasItems = computed(() => this.items().length > 0);

// ❌ Bad
get hasItems() {
  return this.items.length > 0;
}
```

### 3. Expose Necessary State

```typescript
// ✅ Good - consumers can access isDark
export class ScThemeToggle {
  readonly isDark = signal(false);
}

// ❌ Bad - consumers can't access state
export class ScThemeToggle {
  private isDark = signal(false);
}
```

### 4. Use exportAs for Components

```typescript
// ✅ Good - can access via template reference
@Component({
  exportAs: 'scThemeToggle',
})

// ❌ Bad - no template access
@Component({
  // Missing exportAs
})
```

### 5. Document Public APIs

````typescript
/**
 * Theme toggle button component.
 *
 * @example
 * ```html
 * <button sc-theme-toggle #toggle="scThemeToggle">
 *   @if (toggle.isDark()) {
 *     <svg>Sun</svg>
 *   } @else {
 *     <svg>Moon</svg>
 *   }
 * </button>
 * ```
 */
@Component({
  exportAs: 'scThemeToggle',
})
export class ScThemeToggle {
  /** Whether dark mode is active */
  readonly isDark = signal(false);
}
````

## Migration Guide

### Step 1: Identify Imperative Patterns

Look for:

- Service-based dialogs/modals
- `.open()`, `.close()`, `.show()`, `.hide()` methods
- Event emitters for show/hide
- Logic scattered across services

### Step 2: Convert to State

Replace methods with signals:

```typescript
// Before
open() {
  this.isOpen = true;
  this.opened.emit();
}

// After
readonly isOpen = signal(false);
```

### Step 3: Update Templates

Move logic to template:

```html
<!-- Before -->
<button (click)="openDialog()">Open</button>

<!-- After -->
<button (click)="dialogOpen.set(true)">Open</button>

<div sc-dialog [open]="dialogOpen()">
  <!-- content -->
</div>
```

### Step 4: Use Template References

Replace hidden templates with consumer-provided content:

```html
<!-- Before (hidden in component) -->
<button sc-theme-toggle></button>

<!-- After (visible in template) -->
<button sc-theme-toggle #toggle="scThemeToggle">
  @if (toggle.isDark()) {
  <svg>Sun</svg>
  }
</button>
```

## Trade-offs

While the declarative approach offers many benefits, it's important to understand the trade-offs:

### Advantages

✅ **Transparency** - All UI visible in templates
✅ **Reactivity** - Automatic updates with signals
✅ **Flexibility** - Full control over structure and content
✅ **Testability** - No service mocking needed
✅ **Consistency** - Predictable patterns across all components

### Disadvantages

⚠️ **More Verbose** - Requires more template code per usage
⚠️ **Less Convenient** - Components don't "just work" out of the box
⚠️ **Learning Curve** - Different from imperative libraries developers know
⚠️ **Boilerplate** - Need template references and conditional logic
⚠️ **Template Size** - Templates can become large with full markup

### Example Comparison

**Imperative (Less Code):**

```html
<button (click)="openDialog()">Open</button>
```

```typescript
openDialog() {
  this.dialog.open(DialogComponent);
}
```

**Declarative (More Code):**

```html
<button (click)="dialogOpen.set(true)">Open</button>

<div sc-dialog [open]="dialogOpen()">
  <div sc-dialog-header>Title</div>
  <div sc-dialog-content>Content</div>
  <div sc-dialog-footer>
    <button (click)="dialogOpen.set(false)">Close</button>
  </div>
</div>
```

### When to Choose Declarative

**Choose this library if you value:**

- Full control over component structure
- Template-visible UI logic
- Composability and customization
- Type safety without service injection

**Choose imperative libraries if you need:**

- Quick, minimal code solutions
- "Just works" out of the box experience
- Familiarity with traditional patterns
- Less initial setup

### Philosophy

The declarative approach **trades convenience for control**. You write more code upfront, but gain:

- Complete transparency of what renders
- Full customization without overrides
- Better composition and reusability
- Clearer understanding of your UI

This aligns with the library's core values: **composable** and **declarative** over convenient and magical.

## Summary

The declarative architecture pattern provides:

✅ **Transparency** - All UI visible in templates
✅ **Reactivity** - Automatic updates with signals
✅ **Flexibility** - Consumers control content
✅ **Testability** - No service mocking needed
✅ **Simplicity** - State-driven, no complex lifecycles

**Core Philosophy:** Control components through state and bindings, not through method calls. Put the UI in templates where it belongs.

**Trade-off:** More code upfront, but greater control and transparency.

## Resources

- [Composable Architecture Guide](./composable-architecture.md)
- [Angular Signals](https://angular.dev/guide/signals)
- [Template Syntax](https://angular.dev/guide/templates)
- [Content Projection](https://angular.dev/guide/components/content-projection)
