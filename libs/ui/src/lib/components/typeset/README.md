# Typeset

A heading set as Typeset sets it: `scHeading` on a native `h1`–`h6`.

## Usage

```typescript
import { ScHeading } from '@semantic-components/ui';

@Component({
  imports: [ScHeading],
  template: ` <h1 scHeading>Page Title</h1> `,
})
export class MyComponent {}
```

## Components

### `ScHeading`

A directive on `h1`–`h6`. Its look comes from `typeset.css`, which your global stylesheet imports (`@import '@semantic-components/ui/styles/typeset.css';`): the same rules as a heading in a `typeset` container (rendered markdown, a chat answer), so a heading you write and one in rendered content look the same. No Tailwind classes of its own.

**Selector:** `h1[scHeading]` … `h6[scHeading]`

**Inputs:**

| Input   | Type     | Default | Description                         |
| ------- | -------- | ------- | ----------------------------------- |
| `class` | `string` | `''`    | Your classes; they win (see below). |

**Heading levels** (in `em`, from the size around it):

| Level | Size       | Line height | Weight | Space above              |
| ----- | ---------- | ----------- | ------ | ------------------------ |
| `h1`  | `1.75em`   | `1.3`       | 600    | `--typeset-flow`         |
| `h2`  | `1.25em`   | `1.4`       | 600    | `--typeset-flow` × 1.4   |
| `h3`  | `1.125em`  | `1.45`      | 600    | `--typeset-flow`         |
| `h4`  | `1em`      | `1.5`       | 600    | `--typeset-flow`         |
| `h5`  | `0.875em`  | `1.5`       | 500    | muted                    |
| `h6`  | `0.8125em` | `1.5`       | 500    | muted, uppercase, spaced |

**Variables** (set them on any ancestor, or on a `typeset` container's preset class): `--typeset-flow` (space above; `1.25em` when unset), `--typeset-font-heading` (`--font-heading` when unset), `--typeset-muted` (`--color-muted-foreground` when unset).

**Your classes win:** the rules are in `@layer components` with `:where()` selectors, so a utility on the heading (`text-2xl`, `mt-0`) beats them.

## Examples

### Basic headings

```html
<h1 scHeading>Main Title</h1>
<h2 scHeading>Section Title</h2>
<h3 scHeading>Subsection Title</h3>
<h4 scHeading>Minor Heading</h4>
```

### Custom classes

```html
<h1 scHeading class="text-primary text-center">Centered Primary Title</h1>
```

## Accessibility

- It goes on native heading elements (`h1`–`h6`), so the document outline and heading hierarchy stay.
- Use heading levels in logical order (do not skip levels) so screen readers can navigate the page structure.
