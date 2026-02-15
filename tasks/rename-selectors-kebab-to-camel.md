# Refactor: Rename attribute selectors from kebab-case to camelCase

## Goal

Migrate all Angular attribute selectors from kebab-case (e.g., `sc-checkbox-field`) to camelCase (e.g., `scCheckboxField`).

## Why

Angular attribute selectors work best in camelCase. It aligns with Angular conventions (`ngIf`, `ngFor`, `routerLink`, `formField`) and avoids confusion with native HTML attributes or web component element selectors.

## What changes

Only the **selector strings** change. Everything else stays the same:

- Data-slot values remain kebab-case (e.g., `data-slot="checkbox-field"`)
- TypeScript class names remain PascalCase (e.g., `ScCheckboxField`)
- File names remain kebab-case (e.g., `checkbox-field.ts`)
- Injection token names remain UPPER_SNAKE_CASE (e.g., `SC_CHECKBOX_FIELD`)
- `exportAs` values remain unchanged

## Pattern

For each component/directive:

### 1. Update the selector in the decorator

```typescript
// Before
@Directive({
  selector: 'input[type="checkbox"][sc-checkbox]',
})

// After
@Directive({
  selector: 'input[type="checkbox"][scCheckbox]',
})
```

```typescript
// Before
@Component({
  selector: 'div[sc-checkbox-field], label[sc-checkbox-field]',
})

// After
@Component({
  selector: 'div[scCheckboxField], label[scCheckboxField]',
})
```

### 2. Update internal template references

If a component's template references another component's selector, update those too:

```typescript
// Before (checkbox-field.ts template)
template: `
  <ng-content select="[sc-checkbox]" />
  <span sc-checkbox-visual></span>
  <ng-content />
`,

// After
template: `
  <ng-content select="[scCheckbox]" />
  <span scCheckboxVisual></span>
  <ng-content />
`,
```

### 3. Update all template usages in consuming components

```html
<!-- Before -->
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox [(checked)]="value" />
</div>

<!-- After -->
<div scCheckboxField>
  <input type="checkbox" scCheckbox [(checked)]="value" />
</div>
```

### 4. Update code strings in demo containers

Demo container components have a `code` string property that mirrors the demo template for display. These must be updated too:

```typescript
readonly code = `
  <div scCheckboxField>
    <input type="checkbox" scCheckbox [(checked)]="value" />
  </div>
`;
```

### 5. Update documentation

Update any `.md` files that reference the selectors in code examples or prose.

## Completed

- [x] Checkbox components (`scCheckbox`, `scCheckboxField`, `scCheckboxVisual`)

## Remaining components

Apply the same pattern to all other components in the library. Below is a checklist of component groups to migrate. For each group:

1. Find the core component/directive files in `libs/ui-lab/src/lib/components/` (or `libs/ui/`)
2. Update the `selector` in each `@Component` / `@Directive` decorator
3. Update any internal template references to sibling selectors
4. Find all demo files in `apps/showcase/src/app/pages/docs/` that use those selectors
5. Update both the live template and the `code` string in the container
6. Update any docs in `docs/` or `README.md` files
7. Build to verify: `npx nx build ui-lab` and `npx nx build showcase`

### How to find all selectors to rename

```bash
# Find all kebab-case attribute selectors in the library
grep -rn "selector:.*\[sc-" libs/ui-lab/src/ libs/ui/src/
```

### How to find all template usages

```bash
# Find all template usages of a specific kebab-case selector
grep -rn "sc-button" apps/showcase/src/ libs/ui-lab/src/ libs/ui/src/ docs/
```

### Naming conversion rule

| kebab-case             | camelCase            |
| ---------------------- | -------------------- |
| `sc-button`            | `scButton`           |
| `sc-checkbox-field`    | `scCheckboxField`    |
| `sc-dialog-trigger`    | `scDialogTrigger`    |
| `sc-field-description` | `scFieldDescription` |
| `sc-label`             | `scLabel`            |

General rule: drop the hyphens and capitalize the letter after each hyphen.
