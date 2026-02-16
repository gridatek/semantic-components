# Code Viewer Components

A read-only code display component with syntax highlighting powered by [Shiki](https://shiki.style/) and shadcn/ui styling. Automatically follows the app's light/dark theme.

## Import

```typescript
import { ScCodeViewer, ScCodeViewerHeader, ScCodeViewerLabel, ScCodeViewerContent, ScCodeViewerLanguage } from '@semantic-components/ui-lab';
```

## Architecture

The component uses Shiki's dual-theme feature (`github-light` + `github-dark`) with `defaultColor: false` to generate CSS variable-based output. The CSS switches between `--shiki-light` and `--shiki-dark` variables based on the `.dark` class on the document root.

```
ScCodeViewer (Root - div[scCodeViewer])
├── ScCodeViewerHeader (Header - div[scCodeViewerHeader])
│   ├── ScCodeViewerLabel (Label - span[scCodeViewerLabel])
│   └── ScCopyButton (Copy button)
└── ScCodeViewerContent (Content - div[scCodeViewerContent])
```

## Components

| Component             | Selector                      | Description                      |
| --------------------- | ----------------------------- | -------------------------------- |
| `ScCodeViewer`        | `div[scCodeViewer]`         | Root container with border       |
| `ScCodeViewerHeader`  | `div[scCodeViewerHeader]`  | Header bar with border           |
| `ScCodeViewerLabel`   | `span[scCodeViewerLabel]`  | Label for filename or language   |
| `ScCodeViewerContent` | `div[scCodeViewerContent]` | Content with syntax highlighting |

## Inputs

### ScCodeViewer (Root)

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

The root container with border and rounded corners.

### ScCodeViewerHeader

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Header bar with bottom border for filename/language label and copy button.

### ScCodeViewerLabel

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Label for displaying filename or language with muted foreground styling.

### ScCodeViewerContent

| Input             | Type                   | Default       | Description                      |
| ----------------- | ---------------------- | ------------- | -------------------------------- |
| `code`            | `string`               | **required**  | The source code to display       |
| `language`        | `ScCodeViewerLanguage` | `'plaintext'` | Language for syntax highlighting |
| `showLineNumbers` | `boolean`              | `false`       | Whether to show line numbers     |
| `class`           | `string`               | `''`          | Additional CSS classes           |

The content component with Shiki syntax highlighting.

## Supported Languages

`angular-ts` | `typescript` | `javascript` | `html` | `css` | `json` | `python` | `bash` | `shell` | `markdown` | `yaml` | `sql` | `go` | `rust` | `java` | `plaintext`

## Usage

### Basic Usage

```html
<div scCodeViewer>
  <div scCodeViewerHeader>
    <span scCodeViewerLabel>TypeScript</span>
    <button scCopyButton [value]="code"></button>
  </div>
  <div scCodeViewerContent [code]="code" language="typescript"></div>
</div>
```

### With Filename

```html
<div scCodeViewer>
  <div scCodeViewerHeader>
    <span scCodeViewerLabel>app.component.ts</span>
    <button scCopyButton [value]="code"></button>
  </div>
  <div scCodeViewerContent [code]="code" language="angular-ts"></div>
</div>
```

### With Line Numbers

```html
<div scCodeViewer>
  <div scCodeViewerHeader>
    <span scCodeViewerLabel>{{ filename }}</span>
    <button scCopyButton [value]="code"></button>
  </div>
  <div scCodeViewerContent [code]="code" language="typescript" [showLineNumbers]="true"></div>
</div>
```

### Without Header

```html
<div scCodeViewer>
  <div scCodeViewerContent [code]="code" language="json"></div>
</div>
```

### With Max Height

```html
<div scCodeViewer>
  <div scCodeViewerHeader>
    <span scCodeViewerLabel>{{ language }}</span>
    <button scCopyButton [value]="code"></button>
  </div>
  <div scCodeViewerContent [code]="longCode" language="typescript" maxHeight="300px"></div>
</div>
```

### Custom Header Content

```html
<div scCodeViewer>
  <div scCodeViewerHeader>
    <div class="flex items-center gap-2">
      <svg class="size-4"><!-- icon --></svg>
      <span scCodeViewerLabel>{{ filename }}</span>
      <span class="text-xs text-muted-foreground">({{ lines }} lines)</span>
    </div>
    <div class="flex gap-2">
      <button>Download</button>
      <button scCopyButton [value]="code"></button>
    </div>
  </div>
  <div scCodeViewerContent [code]="code" [language]="language"></div>
</div>
```

## Theming

The component automatically follows the app's theme:

- **Light mode**: Uses `github-light` Shiki theme
- **Dark mode**: Uses `github-dark` Shiki theme (activated by `.dark` class on `<html>`)

No manual theme configuration is needed. The component renders both theme colors as CSS variables and switches between them with CSS.

## Features

- **Composable Architecture**: Build custom layouts with separate header and content components
- **Syntax Highlighting**: Powered by Shiki with 30+ languages supported
- **Automatic Theming**: Follows app's light/dark mode automatically
- **Line Numbers**: Optional line number display
- **Copy Button**: Built-in copy-to-clipboard functionality with ScCopyButton
- **Customizable**: All components accept custom classes
- **Accessible**: Proper semantic HTML and ARIA attributes

## Styling

The components use Tailwind CSS with shadcn/ui design tokens:

- **Container** (`ScCodeViewer`): `rounded-lg border border-border overflow-hidden`
- **Header** (`ScCodeViewerHeader`): `flex items-center justify-between border-b border-border px-4 py-2`
- **Label** (`ScCodeViewerLabel`): `text-xs font-medium text-muted-foreground`
- **Content** (`ScCodeViewerContent`): `overflow-auto` with configurable max-height
- **Code font**: System monospace stack (`ui-monospace, SFMono-Regular, ...`)
- **Line numbers**: Muted foreground at 50% opacity, non-selectable
