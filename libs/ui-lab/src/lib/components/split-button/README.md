# Split Button

A button with a dropdown menu for additional actions. The main button performs the primary action, while the dropdown provides secondary options.

## Installation

```typescript
import { ScSplitButton } from '@/ui/split-button';
import type { SplitButtonAction, SplitButtonSize, SplitButtonVariant } from '@/ui/split-button';
```

## Usage

### Basic Usage

```html
<scSplitButton label="Save" [actions]="actions" (mainClick)="onSave()" (actionClick)="onActionClick($event)" />
```

```typescript
actions: SplitButtonAction[] = [
  { id: 'save-draft', label: 'Save as Draft' },
  { id: 'save-template', label: 'Save as Template' },
  { id: 'discard', label: 'Discard', destructive: true },
];
```

### With Icon

```html
<scSplitButton label="Download" [icon]="downloadIcon" [actions]="downloadActions" />
```

### Variant Options

```html
<scSplitButton label="Default" variant="default" [actions]="actions" />
<scSplitButton label="Secondary" variant="secondary" [actions]="actions" />
<scSplitButton label="Outline" variant="outline" [actions]="actions" />
<scSplitButton label="Destructive" variant="destructive" [actions]="actions" />
```

### Size Variants

```html
<scSplitButton label="Small" size="sm" [actions]="actions" />
<scSplitButton label="Medium" size="md" [actions]="actions" />
<scSplitButton label="Large" size="lg" [actions]="actions" />
```

## API Reference

### Inputs

| Input      | Type                                                     | Default     | Description               |
| ---------- | -------------------------------------------------------- | ----------- | ------------------------- |
| `label`    | `string`                                                 | (required)  | Main button label         |
| `actions`  | `SplitButtonAction[]`                                    | `[]`        | Dropdown menu actions     |
| `icon`     | `string`                                                 | `undefined` | HTML icon for main button |
| `variant`  | `'default' \| 'secondary' \| 'outline' \| 'destructive'` | `'default'` | Button style variant      |
| `size`     | `'sm' \| 'md' \| 'lg'`                                   | `'md'`      | Button size               |
| `disabled` | `boolean`                                                | `false`     | Disable the entire button |
| `class`    | `string`                                                 | `''`        | Additional CSS classes    |

### Outputs

| Output        | Type                | Description                           |
| ------------- | ------------------- | ------------------------------------- |
| `mainClick`   | `void`              | Emitted when main button is clicked   |
| `actionClick` | `SplitButtonAction` | Emitted when dropdown item is clicked |

## Type Definitions

```typescript
interface SplitButtonAction {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  destructive?: boolean;
}

type SplitButtonVariant = 'default' | 'secondary' | 'outline' | 'destructive';
type SplitButtonSize = 'sm' | 'md' | 'lg';
```

## Features

- Split button with dropdown menu
- Multiple style variants
- Multiple size options
- Main button with optional icon
- Dropdown actions with optional icons
- Destructive action styling
- Disabled state for button and individual actions
- Click outside to close dropdown
- Escape key to close dropdown
- Keyboard accessible
- Animated chevron indicator
