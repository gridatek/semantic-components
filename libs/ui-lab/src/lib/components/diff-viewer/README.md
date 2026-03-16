# Diff Viewer

A composable set of directives for comparing text and code changes in split or unified view.

## Usage

```html
<div scDiffViewer [oldText]="oldCode" [newText]="newCode" #diff="scDiffViewer">
  <div scDiffViewerHeader>
    <div class="flex items-center gap-2 text-sm">
      <span class="text-muted-foreground">file.ts (original)</span>
      <span class="text-muted-foreground">→</span>
      <span class="text-muted-foreground">file.ts (modified)</span>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3 text-sm">
        <span class="text-green-600 dark:text-green-400">+{{ diff.diffResult().additions }}</span>
        <span class="text-red-600 dark:text-red-400">-{{ diff.diffResult().deletions }}</span>
      </div>
      <div scDiffViewerToggle>
        <button scDiffViewerToggleButton mode="split">Split</button>
        <button scDiffViewerToggleButton mode="unified">Unified</button>
      </div>
    </div>
  </div>
  <div scDiffViewerContent>
    @if (diff.viewMode() === 'split') {
    <div scDiffViewerSplit>
      <div scDiffViewerPane side="old">
        <div scDiffViewerPaneHeader variant="old">Original</div>
        <sc-diff-viewer-lines side="old" />
      </div>
      <div scDiffViewerPane side="new">
        <div scDiffViewerPaneHeader variant="new">Modified</div>
        <sc-diff-viewer-lines side="new" />
      </div>
    </div>
    } @else {
    <sc-diff-viewer-lines side="unified" />
    } @if (diff.diffResult().lines.length === 0) {
    <div scDiffViewerEmpty>No differences found</div>
    }
  </div>
  <div scDiffViewerFooter>
    <span>{{ diff.diffResult().lines.length }} lines</span>
    <span>{{ diff.diffResult().additions }} additions, {{ diff.diffResult().deletions }} deletions, {{ diff.diffResult().unchanged }} unchanged</span>
  </div>
</div>
```

## Directives

### ScDiffViewer

Root directive that manages diff state. Provides `SC_DIFF_VIEWER` injection token.

**Selector:** `[scDiffViewer]`
**Export As:** `scDiffViewer`

**Inputs:**

| Input              | Type                   | Default   | Description                  |
| ------------------ | ---------------------- | --------- | ---------------------------- |
| `oldText`          | `string`               | `''`      | Original text content        |
| `newText`          | `string`               | `''`      | Modified text content        |
| `oldTitle`         | `string`               | `''`      | Title for original version   |
| `newTitle`         | `string`               | `''`      | Title for modified version   |
| `defaultViewMode`  | `'split' \| 'unified'` | `'split'` | Initial view mode            |
| `showWordDiff`     | `boolean`              | `true`    | Highlight word-level changes |
| `ignoreWhitespace` | `boolean`              | `false`   | Ignore whitespace diffs      |
| `ignoreCase`       | `boolean`              | `false`   | Ignore case diffs            |
| `class`            | `string`               | `''`      | Additional CSS classes       |

**Exposed via `exportAs`:**

| Property     | Type                           | Description                    |
| ------------ | ------------------------------ | ------------------------------ |
| `diffResult` | `Signal<DiffResult>`           | Computed diff result           |
| `viewMode`   | `WritableSignal<DiffViewMode>` | Current view mode (toggleable) |
| `oldTitle`   | `InputSignal<string>`          | Original title                 |
| `newTitle`   | `InputSignal<string>`          | Modified title                 |

### ScDiffViewerHeader

Header bar container with flex layout.

**Selector:** `div[scDiffViewerHeader]`

### ScDiffViewerToggle

Container for view mode toggle buttons.

**Selector:** `div[scDiffViewerToggle]`

### ScDiffViewerToggleButton

Individual toggle button for switching between split/unified views.

**Selector:** `button[scDiffViewerToggleButton]`

**Inputs:**

| Input  | Type                   | Description                |
| ------ | ---------------------- | -------------------------- |
| `mode` | `'split' \| 'unified'` | **(required)** Target mode |

### ScDiffViewerContent

Scrollable content area.

**Selector:** `div[scDiffViewerContent]`

**Inputs:**

| Input       | Type     | Default   | Description            |
| ----------- | -------- | --------- | ---------------------- |
| `maxHeight` | `string` | `'600px'` | Maximum content height |

### ScDiffViewerSplit

Flex container for split (side-by-side) view.

**Selector:** `div[scDiffViewerSplit]`

### ScDiffViewerPane

One side of a split view.

**Selector:** `div[scDiffViewerPane]`

**Inputs:**

| Input  | Type             | Description                         |
| ------ | ---------------- | ----------------------------------- |
| `side` | `'old' \| 'new'` | **(required)** Which side to render |

### ScDiffViewerPaneHeader

Label header for a split view pane.

**Selector:** `div[scDiffViewerPaneHeader]`

**Inputs:**

| Input     | Type             | Default | Description                           |
| --------- | ---------------- | ------- | ------------------------------------- |
| `variant` | `'old' \| 'new'` | `'old'` | Background tint (red-ish / green-ish) |

### ScDiffViewerLines

Line renderer component. Handles line iteration, line numbers, signs, and word-level highlighting.

**Selector:** `sc-diff-viewer-lines`

**Inputs:**

| Input  | Type                          | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| `side` | `'old' \| 'new' \| 'unified'` | **(required)** Rendering mode |

### ScDiffViewerFooter

Footer bar container.

**Selector:** `div[scDiffViewerFooter]`

### ScDiffViewerEmpty

Empty state container.

**Selector:** `div[scDiffViewerEmpty]`

## Types

```typescript
interface DiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
  unchanged: number;
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  oldLineNumber?: number;
  newLineNumber?: number;
  oldContent?: string;
  newContent?: string;
  content?: string;
}
```

## Examples

### Minimal (no header, no footer)

```html
<div scDiffViewer [oldText]="oldText" [newText]="newText">
  <div scDiffViewerContent maxHeight="200px">
    <div scDiffViewerSplit>
      <div scDiffViewerPane side="old">
        <sc-diff-viewer-lines side="old" />
      </div>
      <div scDiffViewerPane side="new">
        <sc-diff-viewer-lines side="new" />
      </div>
    </div>
  </div>
</div>
```

### Unified View Only

```html
<div scDiffViewer [oldText]="oldText" [newText]="newText">
  <div scDiffViewerContent>
    <sc-diff-viewer-lines side="unified" />
  </div>
</div>
```

## Utility Functions

### computeDiff

```typescript
import { computeDiff } from '@semantic-components/ui-lab';

const result = computeDiff(oldText, newText, {
  ignoreWhitespace: true,
  ignoreCase: false,
});
```

### createUnifiedDiff

```typescript
import { createUnifiedDiff } from '@semantic-components/ui-lab';

const unifiedDiff = createUnifiedDiff(oldText, newText, {
  oldHeader: 'a/file.ts',
  newHeader: 'b/file.ts',
  contextLines: 3,
});
```

### computeWordDiff

```typescript
import { computeWordDiff } from '@semantic-components/ui-lab';

const { oldParts, newParts } = computeWordDiff('the quick brown fox', 'the fast brown dog');
```

## Features

- LCS-based diff algorithm
- Word-level diff highlighting
- Split (side-by-side) and unified views
- Fully composable — include only the sections you need
- Scrollable with configurable max height
- Ignore whitespace / case options

## Color Coding

- Green background: Added lines
- Red background: Removed lines
- No highlight: Unchanged lines
- Word-level highlighting within changed lines
