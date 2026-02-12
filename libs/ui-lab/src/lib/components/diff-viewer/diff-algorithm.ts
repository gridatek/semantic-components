export type DiffLineType = 'added' | 'removed' | 'unchanged' | 'modified';

export interface DiffLine {
  type: DiffLineType;
  oldLineNumber?: number;
  newLineNumber?: number;
  oldContent?: string;
  newContent?: string;
  content?: string;
}

export interface DiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
  unchanged: number;
}

export interface DiffOptions {
  ignoreWhitespace?: boolean;
  ignoreCase?: boolean;
  contextLines?: number;
}

/**
 * Compute the diff between two strings using Myers' diff algorithm
 * Simplified implementation for line-by-line comparison
 */
export function computeDiff(
  oldText: string,
  newText: string,
  options: DiffOptions = {},
): DiffResult {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');

  const normalizeForComparison = (line: string): string => {
    let normalized = line;
    if (options.ignoreWhitespace) {
      normalized = normalized.replace(/\s+/g, ' ').trim();
    }
    if (options.ignoreCase) {
      normalized = normalized.toLowerCase();
    }
    return normalized;
  };

  // Create normalized versions for comparison
  const oldNormalized = oldLines.map(normalizeForComparison);
  const newNormalized = newLines.map(normalizeForComparison);

  // Compute LCS table
  const lcs = computeLCS(oldNormalized, newNormalized);

  // Build diff from LCS
  const diffLines: DiffLine[] = [];
  let additions = 0;
  let deletions = 0;
  let unchanged = 0;

  let oldIdx = 0;
  let newIdx = 0;
  let lcsIdx = 0;

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    if (
      lcsIdx < lcs.length &&
      oldIdx < oldLines.length &&
      newIdx < newLines.length &&
      oldNormalized[oldIdx] === lcs[lcsIdx] &&
      newNormalized[newIdx] === lcs[lcsIdx]
    ) {
      // Lines match (unchanged)
      diffLines.push({
        type: 'unchanged',
        oldLineNumber: oldIdx + 1,
        newLineNumber: newIdx + 1,
        content: oldLines[oldIdx],
      });
      unchanged++;
      oldIdx++;
      newIdx++;
      lcsIdx++;
    } else if (
      newIdx < newLines.length &&
      (lcsIdx >= lcs.length || newNormalized[newIdx] !== lcs[lcsIdx]) &&
      (oldIdx >= oldLines.length ||
        oldNormalized[oldIdx] === lcs[lcsIdx] ||
        !lcs.includes(newNormalized[newIdx]))
    ) {
      // Line was added
      diffLines.push({
        type: 'added',
        newLineNumber: newIdx + 1,
        newContent: newLines[newIdx],
      });
      additions++;
      newIdx++;
    } else if (
      oldIdx < oldLines.length &&
      (lcsIdx >= lcs.length || oldNormalized[oldIdx] !== lcs[lcsIdx])
    ) {
      // Line was removed
      diffLines.push({
        type: 'removed',
        oldLineNumber: oldIdx + 1,
        oldContent: oldLines[oldIdx],
      });
      deletions++;
      oldIdx++;
    }
  }

  return { lines: diffLines, additions, deletions, unchanged };
}

/**
 * Compute Longest Common Subsequence
 */
function computeLCS(oldLines: string[], newLines: string[]): string[] {
  const m = oldLines.length;
  const n = newLines.length;

  // Create DP table
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find LCS
  const lcs: string[] = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (oldLines[i - 1] === newLines[j - 1]) {
      lcs.unshift(oldLines[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

/**
 * Create unified diff format
 */
export function createUnifiedDiff(
  oldText: string,
  newText: string,
  options: DiffOptions & { oldHeader?: string; newHeader?: string } = {},
): string {
  const diff = computeDiff(oldText, newText, options);
  const lines: string[] = [];

  // Add headers
  lines.push(`--- ${options.oldHeader || 'a/file'}`);
  lines.push(`+++ ${options.newHeader || 'b/file'}`);

  // Group changes into hunks
  const hunks = createHunks(diff.lines, options.contextLines ?? 3);

  for (const hunk of hunks) {
    const oldStart = hunk.find((l) => l.oldLineNumber)?.oldLineNumber || 1;
    const newStart = hunk.find((l) => l.newLineNumber)?.newLineNumber || 1;
    const oldCount = hunk.filter((l) => l.type !== 'added').length;
    const newCount = hunk.filter((l) => l.type !== 'removed').length;

    lines.push(`@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`);

    for (const line of hunk) {
      switch (line.type) {
        case 'added':
          lines.push(`+${line.newContent}`);
          break;
        case 'removed':
          lines.push(`-${line.oldContent}`);
          break;
        case 'unchanged':
          lines.push(` ${line.content}`);
          break;
      }
    }
  }

  return lines.join('\n');
}

/**
 * Group diff lines into hunks with context
 */
function createHunks(
  diffLines: DiffLine[],
  contextLines: number,
): DiffLine[][] {
  const hunks: DiffLine[][] = [];
  let currentHunk: DiffLine[] = [];
  let unchangedStreak = 0;

  for (let i = 0; i < diffLines.length; i++) {
    const line = diffLines[i];

    if (line.type === 'unchanged') {
      unchangedStreak++;

      // Check if we should start a new hunk
      if (unchangedStreak > contextLines * 2 && currentHunk.length > 0) {
        // Keep trailing context
        const trailing = currentHunk.slice(-contextLines);
        currentHunk = currentHunk.slice(0, -contextLines);
        if (currentHunk.some((l) => l.type !== 'unchanged')) {
          currentHunk.push(...trailing.slice(0, contextLines));
          hunks.push(currentHunk);
        }
        currentHunk = [];
        unchangedStreak = 0;
      } else {
        currentHunk.push(line);
      }
    } else {
      unchangedStreak = 0;

      // Add leading context if starting a new hunk
      if (currentHunk.length === 0) {
        const startIdx = Math.max(0, i - contextLines);
        for (let j = startIdx; j < i; j++) {
          if (diffLines[j].type === 'unchanged') {
            currentHunk.push(diffLines[j]);
          }
        }
      }

      currentHunk.push(line);
    }
  }

  // Add final hunk
  if (currentHunk.some((l) => l.type !== 'unchanged')) {
    hunks.push(currentHunk);
  }

  return hunks.length > 0 ? hunks : [diffLines];
}

/**
 * Compute word-level diff for inline highlighting
 */
export function computeWordDiff(
  oldLine: string,
  newLine: string,
): {
  oldParts: Array<{ text: string; changed: boolean }>;
  newParts: Array<{ text: string; changed: boolean }>;
} {
  const oldWords = tokenize(oldLine);
  const newWords = tokenize(newLine);

  const lcs = computeLCS(oldWords, newWords);

  const oldParts: Array<{ text: string; changed: boolean }> = [];
  const newParts: Array<{ text: string; changed: boolean }> = [];

  let oldIdx = 0;
  let newIdx = 0;
  let lcsIdx = 0;

  while (oldIdx < oldWords.length || newIdx < newWords.length) {
    if (
      lcsIdx < lcs.length &&
      oldIdx < oldWords.length &&
      newIdx < newWords.length &&
      oldWords[oldIdx] === lcs[lcsIdx] &&
      newWords[newIdx] === lcs[lcsIdx]
    ) {
      oldParts.push({ text: oldWords[oldIdx], changed: false });
      newParts.push({ text: newWords[newIdx], changed: false });
      oldIdx++;
      newIdx++;
      lcsIdx++;
    } else if (
      newIdx < newWords.length &&
      (lcsIdx >= lcs.length || newWords[newIdx] !== lcs[lcsIdx])
    ) {
      newParts.push({ text: newWords[newIdx], changed: true });
      newIdx++;
    } else if (
      oldIdx < oldWords.length &&
      (lcsIdx >= lcs.length || oldWords[oldIdx] !== lcs[lcsIdx])
    ) {
      oldParts.push({ text: oldWords[oldIdx], changed: true });
      oldIdx++;
    }
  }

  return { oldParts, newParts };
}

/**
 * Tokenize a line into words and whitespace
 */
function tokenize(line: string): string[] {
  const tokens: string[] = [];
  let current = '';

  for (const char of line) {
    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = '';
      }
      tokens.push(char);
    } else {
      current += char;
    }
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}
