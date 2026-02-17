# Code Editor Components

An interactive code editor component with syntax highlighting powered by [Shiki](https://shiki.style/) and shadcn/ui styling. Features line numbers, auto-indent, tab handling, and cursor position tracking. Automatically follows the app's light/dark theme.

## Import

```typescript
import { ScCodeEditor, ScCodeEditorHeader, ScCodeEditorLabel, ScCodeEditorFooter, ScCodeEditorContent, ScCodeEditorCopyButton, ScCodeEditorLanguage, detectLanguage } from '@semantic-components/ui-lab';
```

## Architecture

The component uses Shiki's dual-theme feature (`github-light` + `github-dark`) with `defaultColor: false` to generate CSS variable-based output. The CSS switches between `--shiki-light` and `--shiki-dark` variables based on the `.dark` class on the document root.

```
ScCodeEditor (Root - div[scCodeEditor])
├── ScCodeEditorHeader (Header - div[scCodeEditorHeader])
│   ├── ScCodeEditorLabel (Label - span[scCodeEditorLabel])
│   └── ScCodeEditorCopyButton (Copy button)
├── ScCodeEditorContent (Content - div[scCodeEditorContent])
│   ├── Line numbers (optional)
│   └── Editable textarea with syntax highlighting
└── ScCodeEditorFooter (Footer - div[scCodeEditorFooter])
    └── Cursor position and stats
```

## Components

| Component                | Selector                             | Description                           |
| ------------------------ | ------------------------------------ | ------------------------------------- |
| `ScCodeEditor`           | `div[scCodeEditor]`                | Root container with border and focus  |
| `ScCodeEditorHeader`     | `div[scCodeEditorHeader]`         | Header bar with border                |
| `ScCodeEditorLabel`      | `span[scCodeEditorLabel]`         | Label for filename or language        |
| `ScCodeEditorContent`    | `div[scCodeEditorContent]`        | Editable code area with highlighting  |
| `ScCodeEditorCopyButton` | `button[scCodeEditorCopyButton]` | Copy button with visual feedback      |
| `ScCodeEditorFooter`     | `div[scCodeEditorFooter]`         | Footer with cursor position and stats |

## Inputs

### ScCodeEditor (Root)

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

The root container with border, rounded corners, and focus-within ring.

### ScCodeEditorHeader

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Header bar with bottom border for filename/language label and copy button.

### ScCodeEditorLabel

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Label for displaying filename or language with muted foreground styling.

### ScCodeEditorFooter

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Footer bar with top border for displaying cursor position and file statistics.

### ScCodeEditorCopyButton

| Input   | Type     | Default      | Description            |
| ------- | -------- | ------------ | ---------------------- |
| `code`  | `string` | **required** | The code to copy       |
| `class` | `string` | `''`         | Additional CSS classes |

Copy button that shows a checkmark on successful copy for 2 seconds.

### ScCodeEditorContent

| Input                | Type                   | Default       | Description                       |
| -------------------- | ---------------------- | ------------- | --------------------------------- |
| `value`              | `string`               | `''`          | Two-way bound editor value        |
| `language`           | `ScCodeEditorLanguage` | `'plaintext'` | Language for syntax highlighting  |
| `filename`           | `string`               | `''`          | Filename for language detection   |
| `placeholder`        | `string`               | `''`          | Placeholder text when empty       |
| `disabled`           | `boolean`              | `false`       | Whether the editor is disabled    |
| `readonly`           | `boolean`              | `false`       | Whether the editor is read-only   |
| `showLineNumbers`    | `boolean`              | `true`        | Whether to show line numbers      |
| `tabSize`            | `number`               | `2`           | Number of spaces per tab          |
| `insertSpaces`       | `boolean`              | `true`        | Insert spaces instead of tabs     |
| `wordWrap`           | `boolean`              | `false`       | Enable word wrapping              |
| `autoDetectLanguage` | `boolean`              | `false`       | Auto-detect language from content |
| `ariaLabel`          | `string`               | `''`          | Accessibility label               |
| `ariaDescribedby`    | `string`               | `''`          | Accessibility description ID      |
| `class`              | `string`               | `''`          | Additional CSS classes            |

## Outputs

### ScCodeEditorContent

| Output             | Type                               | Description                       |
| ------------------ | ---------------------------------- | --------------------------------- |
| `valueChange`      | `string`                           | Emitted when editor value changes |
| `languageDetected` | `ScCodeEditorLanguage`             | Emitted when language is detected |
| `cursorChange`     | `{ line: number; column: number }` | Emitted when cursor moves         |

## Supported Languages

`angular-ts` | `typescript` | `javascript` | `html` | `css` | `json` | `python` | `bash` | `shell` | `markdown` | `yaml` | `sql` | `go` | `rust` | `java` | `plaintext`

## Usage

### Basic Usage

```html
<div scCodeEditor>
  <div scCodeEditorContent [(value)]="code" language="typescript"></div>
</div>
```

### Full Featured Editor

```html
<div scCodeEditor>
  <div scCodeEditorHeader>
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">{{ filename }}</span>
      <span scCodeEditorLabel>{{ language }}</span>
    </div>
    <button scCodeEditorCopyButton [code]="code"></button>
  </div>

  <div scCodeEditorContent [(value)]="code" [language]="language" [filename]="filename" [showLineNumbers]="true" (cursorChange)="onCursorChange($event)"></div>

  <div scCodeEditorFooter>
    <div class="flex items-center gap-3">
      <span>Ln {{ line }}, Col {{ column }}</span>
    </div>
    <div class="flex items-center gap-3">
      <span>{{ lineCount }} lines</span>
      <span>{{ charCount }} chars</span>
    </div>
  </div>
</div>
```

### Minimal Editor (No Header/Footer)

```html
<div scCodeEditor>
  <div scCodeEditorContent [(value)]="code" language="json" [showLineNumbers]="false"></div>
</div>
```

### With Auto-Detect Language

```html
<div scCodeEditor>
  <div scCodeEditorHeader>
    <span scCodeEditorLabel>{{ detectedLanguage }}</span>
    <button scCodeEditorCopyButton [code]="code"></button>
  </div>

  <div scCodeEditorContent [(value)]="code" [autoDetectLanguage]="true" (languageDetected)="detectedLanguage = $event"></div>
</div>
```

### Read-Only Mode

```html
<div scCodeEditor>
  <div scCodeEditorContent [(value)]="code" language="typescript" [readonly]="true"></div>
</div>
```

### With Word Wrap

```html
<div scCodeEditor>
  <div scCodeEditorContent [(value)]="longCode" language="markdown" [wordWrap]="true" class="max-h-[400px]"></div>
</div>
```

### Custom Tab Size

```html
<div scCodeEditor>
  <div scCodeEditorContent [(value)]="code" language="python" [tabSize]="4" [insertSpaces]="true"></div>
</div>
```

### Tracking Cursor Position

```typescript
export class MyComponent {
  code = signal('');
  cursorPosition = signal({ line: 1, column: 1 });

  onCursorChange(position: { line: number; column: number }) {
    this.cursorPosition.set(position);
  }
}
```

```html
<div scCodeEditor>
  <div scCodeEditorContent [(value)]="code" language="typescript" (cursorChange)="onCursorChange($event)"></div>

  <div scCodeEditorFooter>
    <span>Ln {{ cursorPosition().line }}, Col {{ cursorPosition().column }}</span>
  </div>
</div>
```

## Features

### Composable Architecture

Build custom layouts with separate header, content, and footer components.

### Syntax Highlighting

Powered by Shiki with 30+ languages supported. Real-time highlighting as you type.

### Smart Indentation

- **Tab key**: Insert spaces or tabs (configurable)
- **Shift+Tab**: Outdent current line
- **Enter**: Auto-indent based on previous line
- **Auto-indent**: Extra indent after `{`, `[`, or `:`
- **Smart brackets**: Auto-outdent when typing `}`, `]`, or `)`

### Line Numbers

Optional line numbers with active line highlighting.

### Language Detection

Automatic language detection from file extension or content patterns using the `detectLanguage()` function.

### Cursor Tracking

Real-time cursor position (line and column) tracking with change events.

### Copy Button

Built-in copy-to-clipboard functionality with visual feedback.

### Accessibility

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Customizable

All components accept custom classes for styling flexibility.

## Theming

The component automatically follows the app's theme:

- **Light mode**: Uses `github-light` Shiki theme
- **Dark mode**: Uses `github-dark` Shiki theme (activated by `.dark` class on `<html>`)

No manual theme configuration is needed. The component renders both theme colors as CSS variables and switches between them with CSS.

## Keyboard Shortcuts

| Key           | Action                                    |
| ------------- | ----------------------------------------- |
| `Tab`         | Insert indent (spaces or tab)             |
| `Shift+Tab`   | Remove indent                             |
| `Enter`       | New line with auto-indent                 |
| `{`, `[`, `:` | Extra indent on next line after Enter     |
| `}`, `]`, `)` | Auto-outdent when line is only whitespace |

## Utility Functions

### detectLanguage(code, filename?)

Automatically detects the programming language from code content or filename.

```typescript
import { detectLanguage } from '@semantic-components/ui-lab';

const language = detectLanguage(code, 'app.component.ts');
// Returns: 'typescript'

const detectedFromContent = detectLanguage('function hello() {}');
// Returns: 'javascript'
```

**Detection logic:**

1. If filename provided, detect from extension
2. If no filename, analyze code patterns:
   - HTML tags → `html`
   - JSON structure → `json`
   - TypeScript types → `typescript`
   - JavaScript keywords → `javascript`
   - Python syntax → `python`
   - SQL keywords → `sql`
   - Markdown headers → `markdown`
   - Shebang → `bash`

## Styling

The components use Tailwind CSS with shadcn/ui design tokens:

- **Container** (`ScCodeEditor`): Focus-within ring, rounded border
- **Header** (`ScCodeEditorHeader`): Flex layout with bottom border
- **Label** (`ScCodeEditorLabel`): Small muted text
- **Footer** (`ScCodeEditorFooter`): Flex layout with top border
- **Content** (`ScCodeEditorContent`): Relative positioning with overlay layers
- **Line numbers**: Muted at 50% opacity, active line at 100%
- **Code font**: System monospace stack (`ui-monospace, SFMono-Regular, ...`)
- **Textarea**: Transparent with colored caret for overlay effect

## Advanced Example

```typescript
export class CodeEditorExample {
  code = signal(`function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`);

  filename = signal('example.ts');
  language = signal<ScCodeEditorLanguage>('typescript');
  stats = computed(() => {
    const value = this.code();
    return {
      lines: value.split('\n').length,
      chars: value.length,
    };
  });
}
```

```html
<div scCodeEditor>
  <div scCodeEditorHeader>
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">{{ filename() }}</span>
      <span scCodeEditorLabel>{{ language() }}</span>
    </div>
    <button scCodeEditorCopyButton [code]="code()"></button>
  </div>

  <div scCodeEditorContent [(value)]="code" [language]="language()" [filename]="filename()" [showLineNumbers]="true" [tabSize]="2" [insertSpaces]="true" class="max-h-[600px] min-h-[300px]"></div>

  <div scCodeEditorFooter>
    <div class="flex items-center gap-3">
      <span>Ln {{ stats().line }}, Col {{ stats().column }}</span>
    </div>
    <div class="flex items-center gap-3">
      <span>{{ stats().lines }} lines</span>
      <span>{{ stats().chars }} chars</span>
    </div>
  </div>
</div>
```
