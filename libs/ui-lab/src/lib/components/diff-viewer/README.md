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
        <div class="font-mono text-sm">
          @for (line of diff.diffResult().lines; track $index) { @if (line.type !== 'added') {
          <div scDiffViewerLine [type]="line.type">
            <span scDiffViewerLineNumber>{{ line.oldLineNumber || '' }}</span>
            <span scDiffViewerLineSign>{{ line.type === 'removed' ? '-' : '' }}</span>
            <span scDiffViewerLineContent [innerHTML]="diff.highlightLine(line, 'old')"></span>
          </div>
          } @else {
          <div scDiffViewerLinePlaceholder></div>
          } }
        </div>
      </div>
      <div scDiffViewerPane side="new">
        <div scDiffViewerPaneHeader variant="new">Modified</div>
        <div class="font-mono text-sm">
          @for (line of diff.diffResult().lines; track $index) { @if (line.type !== 'removed') {
          <div scDiffViewerLine [type]="line.type">
            <span scDiffViewerLineNumber>{{ line.newLineNumber || '' }}</span>
            <span scDiffViewerLineSign>{{ line.type === 'added' ? '+' : '' }}</span>
            <span scDiffViewerLineContent [innerHTML]="diff.highlightLine(line, 'new')"></span>
          </div>
          } @else {
          <div scDiffViewerLinePlaceholder></div>
          } }
        </div>
      </div>
    </div>
    } @else {
    <div class="font-mono text-sm">
      @for (line of diff.diffResult().lines; track $index) {
      <div scDiffViewerLine [type]="line.type">
        <span scDiffViewerLineNumber>{{ line.oldLineNumber || '' }}</span>
        <span scDiffViewerLineNumber>{{ line.newLineNumber || '' }}</span>
        <span scDiffViewerLineSign class="font-bold">
          @switch (line.type) { @case ('added') {
          <span class="text-green-600 dark:text-green-400">+</span>
          } @case ('removed') {
          <span class="text-red-600 dark:text-red-400">-</span>
          } @default {} }
        </span>
        <span scDiffViewerLineContent [innerHTML]="diff.highlightLine(line, line.type === 'removed' ? 'old' : 'new')"></span>
      </div>
      }
    </div>
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

**Methods:**

| Method                      | Description                              |
| --------------------------- | ---------------------------------------- |
| `getLineClass(type)`        | Returns CSS class string for a line type |
| `highlightLine(line, side)` | Returns HTML string with word-diff       |

### ScDiffViewerHeader

Header bar container with flex layout.

**Selector:** `div[scDiffViewerHeader]`

### ScDiffViewerToggle

Container for view mode toggle buttons.

**Selector:** `div[scDiffViewerToggle]`

### ScDiffViewerToggleButton

Toggle button for switching between split/unified views.

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

### ScDiffViewerLine

Line row component. Applies background color based on line type.

**Selector:** `div[scDiffViewerLine]`

**Inputs:**

| Input  | Type     | Description                 |
| ------ | -------- | --------------------------- |
| `type` | `string` | **(required)** DiffLineType |

### ScDiffViewerLineNumber

Line number gutter.

**Selector:** `span[scDiffViewerLineNumber]`

### ScDiffViewerLineSign

Sign indicator (+/-) column.

**Selector:** `span[scDiffViewerLineSign]`

### ScDiffViewerLineContent

Content area for line text. Consumer sets `[innerHTML]` for word-diff highlighting.

**Selector:** `span[scDiffViewerLineContent]`

### ScDiffViewerLinePlaceholder

Empty alignment row for split view (when opposite side has an added/removed line).

**Selector:** `div[scDiffViewerLinePlaceholder]`

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
<div scDiffViewer [oldText]="oldText" [newText]="newText" #diff="scDiffViewer">
  <div scDiffViewerContent maxHeight="200px">
    <div scDiffViewerSplit>
      <div scDiffViewerPane side="old">
        <div class="font-mono text-sm">
          @for (line of diff.diffResult().lines; track $index) { @if (line.type !== 'added') {
          <div scDiffViewerLine [type]="line.type">
            <span scDiffViewerLineNumber>{{ line.oldLineNumber || '' }}</span>
            <span scDiffViewerLineSign>{{ line.type === 'removed' ? '-' : '' }}</span>
            <span scDiffViewerLineContent [innerHTML]="diff.highlightLine(line, 'old')"></span>
          </div>
          } @else {
          <div scDiffViewerLinePlaceholder></div>
          } }
        </div>
      </div>
      <div scDiffViewerPane side="new">
        <div class="font-mono text-sm">
          @for (line of diff.diffResult().lines; track $index) { @if (line.type !== 'removed') {
          <div scDiffViewerLine [type]="line.type">
            <span scDiffViewerLineNumber>{{ line.newLineNumber || '' }}</span>
            <span scDiffViewerLineSign>{{ line.type === 'added' ? '+' : '' }}</span>
            <span scDiffViewerLineContent [innerHTML]="diff.highlightLine(line, 'new')"></span>
          </div>
          } @else {
          <div scDiffViewerLinePlaceholder></div>
          } }
        </div>
      </div>
    </div>
  </div>
</div>
```

### Unified View Only

```html
<div scDiffViewer [oldText]="oldText" [newText]="newText" #diff="scDiffViewer">
  <div scDiffViewerContent>
    <div class="font-mono text-sm">
      @for (line of diff.diffResult().lines; track $index) {
      <div scDiffViewerLine [type]="line.type">
        <span scDiffViewerLineNumber>{{ line.oldLineNumber || '' }}</span>
        <span scDiffViewerLineNumber>{{ line.newLineNumber || '' }}</span>
        <span scDiffViewerLineSign class="font-bold">
          @switch (line.type) { @case ('added') {
          <span class="text-green-600 dark:text-green-400">+</span>
          } @case ('removed') {
          <span class="text-red-600 dark:text-red-400">-</span>
          } @default {} }
        </span>
        <span scDiffViewerLineContent [innerHTML]="diff.highlightLine(line, line.type === 'removed' ? 'old' : 'new')"></span>
      </div>
      }
    </div>
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
