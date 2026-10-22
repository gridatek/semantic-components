import { diffArrays, diffWordsWithSpace } from 'diff';

export interface ScDiffOptions {
  /** All whitespace ignored when comparing lines. */
  readonly ignoreWhitespace?: boolean;
  readonly ignoreCase?: boolean;
}

/** A line of the diff: kept, added or removed — its index in each text. */
export interface ScDiffLine {
  readonly kind: 'context' | 'added' | 'removed';
  /** Index in the old text (context, removed). */
  readonly old?: number;
  /** Index in the new text (context, added). */
  readonly new?: number;
  /** Character ranges changed within the line, when paired with a line on the other side. */
  readonly changes?: readonly (readonly [number, number])[];
}

/** Unchanged lines left out, between two shown. */
export interface ScDiffFold {
  readonly kind: 'fold';
  readonly id: number;
  readonly lines: readonly ScDiffLine[];
}

export type ScDiffRow = ScDiffLine | ScDiffFold;

/** A text's lines, without the empty one after a last newline. */
export function textLines(text: string): string[] {
  return text.replace(/\n$/, '').split('\n');
}

/** The two texts, line by line: what was kept, removed, added — and, in a changed line, its changed words. */
export function diffTexts(
  oldText: string,
  newText: string,
  options: ScDiffOptions = {},
): ScDiffLine[] {
  const oldLines = textLines(oldText);
  const newLines = textLines(newText);
  const normalize = (line: string) => {
    let text = line;
    if (options.ignoreWhitespace) text = text.replace(/\s+/g, '');
    if (options.ignoreCase) text = text.toLowerCase();
    return text;
  };
  const changes = diffArrays(oldLines, newLines, {
    comparator: (left, right) => normalize(left) === normalize(right),
  });

  const lines: ScDiffLine[] = [];
  let oldIndex = 0;
  let newIndex = 0;
  for (let i = 0; i < changes.length; i++) {
    const change = changes[i];
    const count = change.value.length;
    if (change.removed) {
      // Removed then added: the lines face each other — their changed words.
      const next = changes[i + 1];
      const added = next?.added ? next.value.length : 0;
      for (let k = 0; k < count; k++) {
        lines.push({
          kind: 'removed',
          old: oldIndex + k,
          changes:
            k < added
              ? wordChanges(
                  oldLines[oldIndex + k],
                  newLines[newIndex + k],
                  'old',
                )
              : undefined,
        });
      }
      for (let k = 0; k < added; k++) {
        lines.push({
          kind: 'added',
          new: newIndex + k,
          changes:
            k < count
              ? wordChanges(
                  oldLines[oldIndex + k],
                  newLines[newIndex + k],
                  'new',
                )
              : undefined,
        });
      }
      oldIndex += count;
      newIndex += added;
      if (added) i++;
    } else if (change.added) {
      for (let k = 0; k < count; k++)
        lines.push({ kind: 'added', new: newIndex + k });
      newIndex += count;
    } else {
      for (let k = 0; k < count; k++)
        lines.push({ kind: 'context', old: oldIndex + k, new: newIndex + k });
      oldIndex += count;
      newIndex += count;
    }
  }
  return lines;
}

/** The character ranges of one side that differ from the other, word by word. */
function wordChanges(
  oldLine: string,
  newLine: string,
  side: 'old' | 'new',
): (readonly [number, number])[] {
  const ranges: (readonly [number, number])[] = [];
  let at = 0;
  for (const part of diffWordsWithSpace(oldLine, newLine)) {
    const mine = side === 'old' ? !part.added : !part.removed;
    if (!mine) continue;
    const changed = side === 'old' ? part.removed : part.added;
    if (changed) ranges.push([at, at + part.value.length]);
    at += part.value.length;
  }
  return ranges;
}

/**
 * The lines, with the long unchanged runs folded: `context` lines kept next to
 * each change. `null` context: nothing folded.
 */
export function foldLines(
  lines: readonly ScDiffLine[],
  context: number | null,
  expanded: ReadonlySet<number>,
): ScDiffRow[] {
  if (context === null || context < 0) return [...lines];
  const near = lines.map(() => false);
  lines.forEach((line, i) => {
    if (line.kind === 'context') return;
    const last = Math.min(lines.length - 1, i + context);
    for (let k = Math.max(0, i - context); k <= last; k++) near[k] = true;
  });
  const rows: ScDiffRow[] = [];
  let run: ScDiffLine[] = [];
  let id = 0;
  const flush = () => {
    if (!run.length) return;
    const fold: ScDiffFold = { kind: 'fold', id: id++, lines: run };
    // A fold of one line hides nothing worth a button.
    if (run.length === 1 || expanded.has(fold.id)) rows.push(...run);
    else rows.push(fold);
    run = [];
  };
  lines.forEach((line, i) => {
    if (line.kind === 'context' && !near[i]) {
      run.push(line);
    } else {
      flush();
      rows.push(line);
    }
  });
  flush();
  return rows;
}

/** One row of the split view: the old side and the new, facing each other. */
export interface ScDiffSplitRow {
  readonly kind: 'pair';
  readonly left?: ScDiffLine;
  readonly right?: ScDiffLine;
}

/** The rows side by side: removed lines facing the added ones, the rest empty. */
export function splitRows(
  rows: readonly ScDiffRow[],
): (ScDiffSplitRow | ScDiffFold)[] {
  const result: (ScDiffSplitRow | ScDiffFold)[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.kind === 'fold') {
      result.push(row);
    } else if (row.kind === 'context') {
      result.push({ kind: 'pair', left: row, right: row });
    } else if (row.kind === 'removed') {
      const removed: ScDiffLine[] = [];
      const added: ScDiffLine[] = [];
      let k = i;
      while (k < rows.length && rows[k].kind === 'removed')
        removed.push(rows[k++] as ScDiffLine);
      while (k < rows.length && rows[k].kind === 'added')
        added.push(rows[k++] as ScDiffLine);
      i = k - 1;
      for (let n = 0; n < Math.max(removed.length, added.length); n++)
        result.push({ kind: 'pair', left: removed[n], right: added[n] });
    } else {
      result.push({ kind: 'pair', right: row });
    }
  }
  return result;
}
