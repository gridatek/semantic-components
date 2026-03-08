# Typography

Semantic heading directive that applies consistent typographic styles based on the native HTML heading level.

## Usage

```typescript
import { ScHeading } from '@semantic-components/ui';

@Component({
  imports: [ScHeading],
  template: `
    <h1 scHeading>Page Title</h1>
  `,
})
export class MyComponent {}
```

## Components

### `ScHeading`

A directive that styles `h1`-`h4` elements with consistent typography based on the heading level.

**Selector:** `h1[scHeading]`, `h2[scHeading]`, `h3[scHeading]`, `h4[scHeading]`

**Inputs:**

| Input       | Type      | Default | Description                             |
| ----------- | --------- | ------- | --------------------------------------- |
| `class`     | `string`  | `''`    | Additional CSS classes to merge.        |
| `underline` | `boolean` | `false` | Adds a bottom border and padding below. |

**Data attributes:**

| Attribute   | Value     |
| ----------- | --------- |
| `data-slot` | `heading` |

**Heading level styles:**

| Level | Styles                              |
| ----- | ----------------------------------- |
| `h1`  | `text-4xl font-extrabold`           |
| `h2`  | `text-3xl font-semibold first:mt-0` |
| `h3`  | `text-2xl font-semibold`            |
| `h4`  | `text-xl font-semibold`             |

All levels share `scroll-m-20 tracking-tight`.

## Examples

### Basic headings

```html
<h1 scHeading>Main Title</h1>
<h2 scHeading>Section Title</h2>
<h3 scHeading>Subsection Title</h3>
<h4 scHeading>Minor Heading</h4>
```

### Underlined heading

```html
<h2 scHeading [underline]="true">Section With Divider</h2>
```

### Custom classes

```html
<h1 scHeading class="text-primary text-center">Centered Primary Title</h1>
```

## Accessibility

- The directive is applied to native HTML heading elements (`h1`-`h4`), preserving the document outline and heading hierarchy.
- Use heading levels in logical order (do not skip levels) to ensure screen readers can navigate the page structure correctly.
