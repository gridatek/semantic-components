# Composable Architecture Pattern

This guide explains the composable architecture pattern used in Semantic Components for building flexible, accessible, and maintainable form components.

## Overview

The composable architecture breaks down monolithic components into smaller, composable sub-components that communicate through Angular's dependency injection. This pattern provides better flexibility, customization, and separation of concerns.

## When to Use This Pattern

Use the composable architecture for:

- **Form Components**: Inputs, selects, number fields, password fields, etc.
- **Interactive Controls**: Components with multiple interactive elements (buttons, toggles, etc.)
- **Complex Layouts**: Components where users need control over internal structure
- **High Customization**: When users need to customize individual parts

**Don't use for:**

- Simple display components (Badge, Avatar, Skeleton, etc.)
- Components with minimal interaction
- Components with fixed internal structure

## Architecture Structure

### 1. Root Container (State Manager)

The root directive manages shared state and provides context to children.

```typescript
export const SC_COMPONENT_NAME = new InjectionToken<ScComponentName>('SC_COMPONENT_NAME');

@Directive({
  selector: '[sc-component-name]',
  exportAs: 'scComponentName',
  providers: [{ provide: SC_COMPONENT_NAME, useExisting: ScComponentName }],
  host: {
    'data-slot': 'component-name',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScComponentName {
  // Two-way binding for main value
  readonly value = model<ValueType>(defaultValue);

  // Configuration inputs
  readonly disabled = input<boolean>(false);
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);

  // Outputs for state changes
  readonly valueChange = output<ValueType>();

  // Internal state (signals)
  readonly someState = signal(false);

  // Computed values
  readonly canDoAction = computed(() => {
    // Logic here
  });

  // Methods for child components to call
  doAction(): void {
    if (this.disabled()) return;
    // Action logic
  }
}
```

**Key Points:**

- Choose `@Directive` or `@Component` based on your needs:
  - Use `@Directive` when the root only manages state (most common)
  - Use `@Component` when the root needs its own template/rendering
- Provide via `InjectionToken` for type-safe injection
- Use `model()` for two-way binding
- Use `input()` for configuration
- Use `output()` for events
- Use `signal()` for internal state
- Use `computed()` for derived state

#### Choosing Between @Directive and @Component

**Use `@Directive` when:**

- Root only manages state and doesn't need a template
- All rendering is done by child components
- Maximum flexibility in DOM structure
- **Examples**: NumberField, PasswordField, most form components

**Use `@Component` when:**

- Root needs to render wrapper content or structure
- Root provides default rendering with content projection
- Root needs styling or layout that wraps children
- **Examples**: Accordion (renders button headers), Tabs (renders tab buttons)

**Example with `@Component` root:**

```typescript
@Component({
  selector: '[sc-tabs]',
  template: `
    <div class="tabs-header" role="tablist">
      <ng-content select="[sc-tab-trigger]" />
    </div>
    <div class="tabs-content">
      <ng-content select="[sc-tab-content]" />
    </div>
  `,
  providers: [{ provide: SC_TABS, useExisting: ScTabs }],
})
export class ScTabs {
  readonly activeTab = signal<string>('');
  // ... state management
}
```

### 2. Container Components (Layout)

Container components group related sub-components and apply layout styles.

```typescript
@Component({
  selector: '[sc-component-name-group]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'component-name-group',
    '[class]': 'class()',
    '[attr.data-disabled]': 'component.disabled() || null',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComponentNameGroup {
  readonly component = inject(SC_COMPONENT_NAME);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('inline-flex items-center rounded-md border border-input', 'focus-within:ring-1 focus-within:ring-ring', 'data-[disabled]:opacity-50', this.classInput()));
}
```

**Key Points:**

- Inject parent context
- Use `<ng-content />` for projection
- Apply layout/grouping styles
- Support custom classes via `class` input
- Use `data-*` attributes for state

### 3. Interactive Components (Actions)

Components that perform actions (buttons, toggles, inputs).

```typescript
@Component({
  selector: 'button[sc-component-name-action]',
  template: `
    <ng-content>
      <!-- Default icon/content -->
      <svg>...</svg>
    </ng-content>
  `,
  host: {
    'data-slot': 'component-name-action',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!component.canDoAction()',
    '[attr.aria-label]': '"Action description"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComponentNameAction {
  readonly component = inject(SC_COMPONENT_NAME);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('inline-flex size-9 items-center justify-center', 'hover:bg-accent', 'disabled:opacity-50', this.classInput()));

  onClick(): void {
    this.component.doAction();
  }
}
```

**Key Points:**

- Inject parent context
- Support content projection for custom icons
- Bind disabled state from parent
- Include ARIA attributes
- Call parent methods in event handlers

### 4. Input Components

Input fields that sync with parent state.

```typescript
@Component({
  selector: 'input[sc-component-name-input]',
  template: ``,
  host: {
    'data-slot': 'component-name-input',
    type: 'text',
    '[class]': 'class()',
    '[value]': 'component.value()',
    '[disabled]': 'component.disabled()',
    '[placeholder]': 'placeholder()',
    '(input)': 'onInput($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComponentNameInput {
  readonly component = inject(SC_COMPONENT_NAME);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input<string>('');

  protected readonly class = computed(() => cn('flex h-9 w-full rounded-md border border-input', 'focus-visible:outline-none focus-visible:ring-1', 'disabled:cursor-not-allowed disabled:opacity-50', this.classInput()));

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.component.value.set(input.value);
  }
}
```

**Key Points:**

- Empty template (host element is the input)
- Bind value from parent
- Update parent on input
- Support common input attributes

## Naming Conventions

### File Structure

```
component-name/
├── component-name.ts           # Root directive
├── component-name-group.ts     # Container/group
├── component-name-input.ts     # Input field
├── component-name-action.ts    # Action button
├── index.ts                    # Exports
└── README.md                   # Documentation
```

### Class Names

- **Root**: `ScComponentName` (e.g., `ScNumberField`, `ScPasswordField`)
- **Containers**: `ScComponentNameGroup` (e.g., `ScNumberFieldInputGroup`)
- **Actions**: `ScComponentName[Action]` (e.g., `ScNumberFieldIncrement`, `ScPasswordFieldToggle`)
- **Inputs**: `ScComponentNameInput` (e.g., `ScNumberFieldInput`)

### Selectors

- **Root**: `[sc-component-name]` (attribute directive)
- **Containers**: `[sc-component-name-group]` (attribute directive)
- **Actions**: `button[sc-component-name-action]` (element + attribute)
- **Inputs**: `input[sc-component-name-input]` (element + attribute)

### Injection Token

```typescript
export const SC_COMPONENT_NAME = new InjectionToken<ScComponentName>('SC_COMPONENT_NAME');
```

**Convention**: `SC_` prefix + SCREAMING_SNAKE_CASE

## Real-World Examples

### Before: Monolithic Component

```typescript
// Old approach: Everything in one component
@Component({
  selector: 'sc-password-input',
  template: `
    <div class="container">
      <input [type]="visible ? 'text' : 'password'" />
      <button (click)="toggle()">
        <svg>...</svg>
      </button>
    </div>
  `,
})
export class ScPasswordInput {
  visible = signal(false);
  value = model<string>('');

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
```

**Usage:**

```html
<sc-password-input [(value)]="password" />
```

**Limitations:**

- Can't customize internal structure
- Can't replace icons easily
- Fixed layout
- Can't add custom elements between input and button

### After: Composable Architecture

```typescript
// New approach: Composable sub-components

// Root directive
@Directive({
  selector: '[sc-password-field]',
  providers: [{ provide: SC_PASSWORD_FIELD, useExisting: ScPasswordField }],
})
export class ScPasswordField {
  value = model<string>('');
  visible = signal(false);
  disabled = input(false);

  toggle(): void {
    this.visible.update((v) => !v);
  }
}

// Group component
@Component({
  selector: '[sc-password-field-input-group]',
  template: `
    <ng-content />
  `,
})
export class ScPasswordFieldInputGroup {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
}

// Input component
@Component({
  selector: 'input[sc-password-field-input]',
  template: ``,
})
export class ScPasswordFieldInput {
  readonly passwordField = inject(SC_PASSWORD_FIELD);
}

// Toggle component
@Component({
  selector: 'button[sc-password-field-toggle]',
  template: `
    <ng-content><svg>...</svg></ng-content>
  `,
})
export class ScPasswordFieldToggle {
  readonly passwordField = inject(SC_PASSWORD_FIELD);

  onClick(): void {
    this.passwordField.toggle();
  }
}
```

**Usage:**

```html
<!-- Basic usage -->
<div sc-password-field [(value)]="password">
  <div sc-password-field-input-group>
    <input sc-password-field-input />
    <button sc-password-field-toggle></button>
  </div>
</div>

<!-- With label -->
<div sc-password-field [(value)]="password">
  <label sc-label>Password</label>
  <div sc-password-field-input-group>
    <input sc-password-field-input placeholder="Enter password" />
    <button sc-password-field-toggle></button>
  </div>
</div>

<!-- Custom icon -->
<div sc-password-field [(value)]="password">
  <div sc-password-field-input-group>
    <input sc-password-field-input />
    <button sc-password-field-toggle>
      <span>{{ visible() ? 'Hide' : 'Show' }}</span>
    </button>
  </div>
</div>

<!-- With prefix icon -->
<div sc-password-field [(value)]="password">
  <div sc-password-field-input-group>
    <svg class="ml-2"><!-- Lock icon --></svg>
    <input sc-password-field-input class="pl-8" />
    <button sc-password-field-toggle></button>
  </div>
</div>
```

**Benefits:**

- ✅ Full layout control
- ✅ Easy icon customization
- ✅ Can add extra elements
- ✅ Better composition
- ✅ Individual styling control

## Complete Example: Number Field

```typescript
// number-field.ts (Root)
export const SC_NUMBER_FIELD = new InjectionToken<ScNumberField>('SC_NUMBER_FIELD');

@Directive({
  selector: '[sc-number-field]',
  providers: [{ provide: SC_NUMBER_FIELD, useExisting: ScNumberField }],
  host: {
    'data-slot': 'number-field',
    '[attr.data-disabled]': 'disabled() || null',
  },
})
export class ScNumberField {
  readonly value = model<number | null>(null);
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);

  readonly canIncrement = computed(() => {
    if (this.disabled()) return false;
    const val = this.value();
    const max = this.max();
    if (val === null || max === null) return true;
    return val < max;
  });

  increment(): void {
    if (!this.canIncrement()) return;
    const current = this.value() ?? 0;
    this.value.set(current + this.step());
  }

  decrement(): void {
    // Similar logic
  }
}

// number-field-group.ts (Container)
@Component({
  selector: '[sc-number-field-group]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'number-field-group',
    '[class]': 'class()',
  },
})
export class ScNumberFieldInputGroup {
  readonly numberField = inject(SC_NUMBER_FIELD);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('inline-flex items-center border rounded-md', this.classInput()));
}

// number-field-input.ts (Input)
@Component({
  selector: 'input[sc-number-field-input]',
  template: ``,
  host: {
    type: 'text',
    inputmode: 'decimal',
    '[value]': 'numberField.value()',
    '[disabled]': 'numberField.disabled()',
    '(input)': 'onInput($event)',
  },
})
export class ScNumberFieldInput {
  readonly numberField = inject(SC_NUMBER_FIELD);

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    if (!isNaN(value)) {
      this.numberField.value.set(value);
    }
  }
}

// number-field-increment.ts (Action)
@Component({
  selector: 'button[sc-number-field-increment]',
  template: `
    <ng-content><svg>+</svg></ng-content>
  `,
  host: {
    type: 'button',
    '[disabled]': '!numberField.canIncrement()',
    '(click)': 'onClick()',
  },
})
export class ScNumberFieldIncrement {
  readonly numberField = inject(SC_NUMBER_FIELD);

  onClick(): void {
    this.numberField.increment();
  }
}

// number-field-decrement.ts (Action)
@Component({
  selector: 'button[sc-number-field-decrement]',
  template: `
    <ng-content><svg>-</svg></ng-content>
  `,
  host: {
    type: 'button',
    '[disabled]': '!numberField.canDecrement()',
    '(click)': 'onClick()',
  },
})
export class ScNumberFieldDecrement {
  readonly numberField = inject(SC_NUMBER_FIELD);

  onClick(): void {
    this.numberField.decrement();
  }
}
```

**Usage:**

```html
<div sc-number-field [(value)]="count" [min]="0" [max]="100">
  <label sc-label>Count</label>

  <div sc-number-field-group>
    <button sc-number-field-decrement></button>
    <input sc-number-field-input />
    <button sc-number-field-increment></button>
  </div>
</div>
```

## Benefits

### 1. **Flexibility**

- Users control the structure
- Can reorder elements
- Can add custom elements
- Can remove unnecessary parts

### 2. **Customization**

- Each sub-component accepts `class` input
- Content projection for icons/labels
- Full styling control
- No style overrides needed

### 3. **Accessibility**

- Better label association
- Custom ARIA attributes
- Screen reader friendly
- Proper focus management

### 4. **Maintainability**

- Separation of concerns
- Single responsibility per component
- Easier to test
- Clear dependencies

### 5. **Reusability**

- Sub-components can be reused
- Consistent patterns
- Less duplication
- Better composition

## Best Practices

### 1. State Management

**DO:**

```typescript
// Use signals for reactive state
readonly visible = signal(false);

// Use computed for derived state
readonly canSubmit = computed(() =>
  this.email().includes('@') && this.password().length >= 8
);

// Use model for two-way binding
readonly value = model<string>('');
```

**DON'T:**

```typescript
// Don't use plain properties
visible = false;

// Don't use getters for complex logic
get canSubmit() {
  return this.email.includes('@') && this.password.length >= 8;
}
```

### 2. Type Safety

**DO:**

```typescript
// Use specific types
export const SC_NUMBER_FIELD = new InjectionToken<ScNumberField>('SC_NUMBER_FIELD');

// Type the injection
readonly numberField = inject(SC_NUMBER_FIELD);
```

**DON'T:**

```typescript
// Don't use any
export const SC_NUMBER_FIELD = new InjectionToken<any>('SC_NUMBER_FIELD');

// Don't skip typing
readonly numberField = inject(SC_NUMBER_FIELD) as any;
```

### 3. Naming

**DO:**

```typescript
// Use descriptive, specific names
ScPasswordFieldToggle;
ScNumberFieldIncrement;
ScDatePickerCalendar;
```

**DON'T:**

```typescript
// Don't use generic names
ScPasswordButton;
ScNumberButton;
ScDateButton;
```

### 4. Documentation

**DO:**

- Document each sub-component
- Provide usage examples
- Show composition patterns
- Document injection tokens

**DON'T:**

- Only document the root
- Skip examples
- Assume usage is obvious

### 5. Accessibility

**DO:**

```typescript
host: {
  '[attr.aria-label]': '"Increase value"',
  '[attr.aria-pressed]': 'isActive()',
  '[attr.aria-disabled]': 'isDisabled()',
}
```

**DON'T:**

```typescript
host: {
  // Missing ARIA attributes
  '(click)': 'onClick()',
}
```

## Migration Guide

### Step 1: Identify Candidates

Look for components with:

- Multiple interactive elements
- Fixed internal structure
- Low customization options
- User requests for flexibility

### Step 2: Plan the Structure

1. Identify state (root directive)
2. Identify containers (groups)
3. Identify actions (buttons, toggles)
4. Identify inputs (form fields)

### Step 3: Create Root Directive

```typescript
// 1. Create injection token
export const SC_COMPONENT = new InjectionToken<ScComponent>('SC_COMPONENT');

// 2. Create directive
@Directive({
  selector: '[sc-component]',
  providers: [{ provide: SC_COMPONENT, useExisting: ScComponent }],
})
export class ScComponent {
  // Move state here
}
```

### Step 4: Extract Sub-components

For each part of the template:

1. Create new component file
2. Inject parent context
3. Move relevant logic
4. Update template to use `<ng-content />`

### Step 5: Update Tests

1. Test root directive independently
2. Test sub-components with mock parent
3. Test integration

### Step 6: Update Documentation

1. Document each component
2. Provide migration guide
3. Show before/after examples

### Step 7: Deprecate Old Component

1. Mark old component as deprecated
2. Update all demos to new pattern
3. Provide migration timeline

## Common Patterns

### Pattern 1: Optional Sub-components

```html
<!-- Minimal usage -->
<div sc-component [(value)]="value">
  <input sc-component-input />
</div>

<!-- Full usage -->
<div sc-component [(value)]="value">
  <label sc-label>Label</label>
  <div sc-component-group>
    <span sc-component-prefix>$</span>
    <input sc-component-input />
    <span sc-component-suffix>.00</span>
  </div>
  <p sc-component-description>Helper text</p>
</div>
```

### Pattern 2: Conditional Sub-components

```html
<div sc-component [(value)]="value">
  <div sc-component-group>
    @if (showPrefix) {
    <span sc-component-prefix>Icon</span>
    }
    <input sc-component-input />
    @if (showClear && value()) {
    <button sc-component-clear></button>
    }
  </div>
</div>
```

### Pattern 3: Multiple Layouts

```html
<!-- Horizontal layout -->
<div sc-component [(value)]="value">
  <div sc-component-group class="flex-row">
    <button sc-component-decrement></button>
    <input sc-component-input />
    <button sc-component-increment></button>
  </div>
</div>

<!-- Vertical layout -->
<div sc-component [(value)]="value">
  <div sc-component-group class="flex-col">
    <button sc-component-increment></button>
    <input sc-component-input />
    <button sc-component-decrement></button>
  </div>
</div>
```

## Existing Examples

### ✅ Implemented

- **NumberField**: Composable number input with increment/decrement
- **PasswordField**: Composable password input with visibility toggle

### 🎯 Good Candidates for Migration

- **SearchInput**: Could benefit from composable clear button
- **PhoneInput**: Could allow custom country selector
- **DatePicker**: Could separate calendar from input
- **ColorPicker**: Could separate preview from picker
- **FileUpload**: Could separate drop zone from file list

### ❌ Not Suitable

- **Badge**: Too simple, no internal structure
- **Avatar**: Fixed layout, no interaction
- **Skeleton**: Pure display, no state
- **Separator**: Single element

## FAQ

### Q: When should I use composable vs monolithic?

**Use composable when:**

- Component has 3+ interactive parts
- Users need layout control
- Customization is frequently requested
- Similar components have different layouts

**Use monolithic when:**

- Component is simple (1-2 elements)
- Fixed structure is desired
- No customization needed
- Display-only component

### Q: How do I handle forms?

Use the root directive with `model()` for two-way binding:

```typescript
@Directive({ selector: '[sc-component]' })
export class ScComponent {
  readonly value = model<string>('');
}
```

```html
<div sc-component [(value)]="formControl">
  <input sc-component-input />
</div>
```

### Q: How do I share state between sub-components?

Use the injection token:

```typescript
// In sub-component A
readonly parent = inject(SC_COMPONENT);
this.parent.someState.set(true);

// In sub-component B
readonly parent = inject(SC_COMPONENT);
const state = this.parent.someState();
```

### Q: Can sub-components be used independently?

No, sub-components require the parent context. They will throw an error if used without the parent directive.

### Q: How do I test composable components?

Test the root directive and each sub-component independently:

```typescript
// Test root
const fixture = TestBed.createComponent(TestHostComponent);
const directive = fixture.debugElement.query(By.directive(ScComponent));

// Test sub-component
TestBed.configureTestingModule({
  providers: [{ provide: SC_COMPONENT, useValue: mockParent }],
});
```

## Resources

- [Number Field Implementation](../libs/ui/src/lib/components/number-field/)
- [Password Field Implementation](../libs/ui/src/lib/components/password-field/)
- [Angular Dependency Injection](https://angular.dev/guide/di)
- [Angular Signals](https://angular.dev/guide/signals)

## Summary

The composable architecture pattern provides:

✅ **Flexibility** - Users control structure
✅ **Customization** - Full styling control
✅ **Accessibility** - Better markup control
✅ **Maintainability** - Clear separation
✅ **Reusability** - Composable parts

Use this pattern for complex, interactive components where users need control over internal structure and styling.
