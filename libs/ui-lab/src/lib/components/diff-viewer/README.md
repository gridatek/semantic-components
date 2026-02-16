# Diff Viewer

Side-by-side or unified view for comparing text and code changes.

## Usage

```html
<sc-diff-viewer [oldText]="originalCode" [newText]="modifiedCode" [oldTitle]="'file.ts (original)'" [newTitle]="'file.ts (modified)'" />
```

## API

### ScDiffViewer

| Input                | Type                   | Default   | Description                  |
| -------------------- | ---------------------- | --------- | ---------------------------- |
| `oldText`            | `string`               | `''`      | Original text content        |
| `newText`            | `string`               | `''`      | Modified text content        |
| `oldTitle`           | `string`               | `''`      | Title for original version   |
| `newTitle`           | `string`               | `''`      | Title for modified version   |
| `defaultViewMode`    | `'split' \| 'unified'` | `'split'` | Initial view mode            |
| `showHeader`         | `boolean`              | `true`    | Show header with stats       |
| `showFooter`         | `boolean`              | `true`    | Show footer with counts      |
| `showViewModeToggle` | `boolean`              | `true`    | Show view mode toggle        |
| `showSideHeaders`    | `boolean`              | `true`    | Show side-by-side headers    |
| `showWordDiff`       | `boolean`              | `true`    | Highlight word-level changes |
| `ignoreWhitespace`   | `boolean`              | `false`   | Ignore whitespace diffs      |
| `ignoreCase`         | `boolean`              | `false`   | Ignore case diffs            |
| `maxHeight`          | `string`               | `'600px'` | Maximum viewer height        |

### DiffResult

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

### Basic Comparison

```html
<sc-diff-viewer [oldText]="oldCode" [newText]="newCode" />
```

### With Titles

```html
<sc-diff-viewer [oldText]="oldCode" [newText]="newCode" [oldTitle]="'config.json (before)'" [newTitle]="'config.json (after)'" />
```

### Unified View

```html
<sc-diff-viewer [oldText]="oldText" [newText]="newText" [defaultViewMode]="'unified'" />
```

### Ignore Whitespace

```html
<sc-diff-viewer [oldText]="oldText" [newText]="newText" [ignoreWhitespace]="true" />
```

### Minimal View

```html
<sc-diff-viewer [oldText]="oldText" [newText]="newText" [showHeader]="false" [showFooter]="false" [showViewModeToggle]="false" />
```

## Utility Functions

### computeDiff

Compute the diff between two strings:

```typescript
import { computeDiff } from './ui/diff-viewer';

const result = computeDiff(oldText, newText, {
  ignoreWhitespace: true,
  ignoreCase: false,
});

console.log(result.additions); // Number of added lines
console.log(result.deletions); // Number of removed lines
console.log(result.lines); // Array of DiffLine objects
```

### createUnifiedDiff

Create unified diff format (like git diff):

```typescript
import { createUnifiedDiff } from './ui/diff-viewer';

const unifiedDiff = createUnifiedDiff(oldText, newText, {
  oldHeader: 'a/file.ts',
  newHeader: 'b/file.ts',
  contextLines: 3,
});

// Output:
// --- a/file.ts
// +++ b/file.ts
// @@ -1,4 +1,5 @@
//  unchanged line
// -removed line
// +added line
//  unchanged line
```

### computeWordDiff

Compute word-level diff for inline highlighting:

```typescript
import { computeWordDiff } from './ui/diff-viewer';

const { oldParts, newParts } = computeWordDiff('the quick brown fox', 'the fast brown dog');

// oldParts: [{ text: 'the', changed: false }, { text: 'quick', changed: true }, ...]
// newParts: [{ text: 'the', changed: false }, { text: 'fast', changed: true }, ...]
```

## View Modes

### Split View

- Shows old and new versions side-by-side
- Empty rows for alignment
- Best for detailed line-by-line comparison

### Unified View

- Single column with + and - markers
- Similar to `git diff` output
- More compact for large files

## Features

- LCS-based diff algorithm
- Line-by-line comparison
- Word-level diff highlighting
- Split (side-by-side) view
- Unified (single column) view
- Line numbers for both versions
- Change statistics
- View mode toggle
- Ignore whitespace option
- Ignore case option
- Scrollable with max height
- Responsive design

## Color Coding

- Green background: Added lines
- Red background: Removed lines
- No highlight: Unchanged lines
- Word-level highlighting within changed lines
