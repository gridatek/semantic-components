import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_CODE_HIGHLIGHTER, type ScCodeToken } from '../code-block';
import {
  type ScDiffFold,
  type ScDiffLine,
  type ScDiffRow,
  diffTexts,
  foldLines,
  splitRows,
  textLines,
} from './diff-model';
import { ScDiffViewerFold } from './diff-viewer-fold';

export type ScDiffView = 'split' | 'unified';

/** A piece of a line: a token, or a part of one — changed or not. */
interface Piece {
  readonly content: string;
  readonly style: Readonly<Record<string, string>>;
  readonly changed: boolean;
}

interface Cell {
  readonly kind: ScDiffLine['kind'];
  readonly oldNumber: number | null;
  readonly newNumber: number | null;
  readonly pieces: readonly Piece[];
}

type UnifiedRow = Cell | ScDiffFold;
type SplitRow =
  | {
      readonly kind: 'pair';
      readonly left: Cell | null;
      readonly right: Cell | null;
    }
  | ScDiffFold;

/**
 * The differences between two texts (`[oldText]`, `[newText]`), line by line
 * — jsdiff — with the words changed within a changed line. Unified (one
 * column, both line numbers) or split (side by side, rows aligned): `[(view)]`.
 * Highlighted in its `language` by the app's highlighter, like a code block;
 * put it in one (`scCodeBlock`) for its frame and header. Long unchanged runs
 * folded with `context` and a `scDiffViewerFold` template.
 */
@Component({
  selector: 'div[scDiffViewer]',
  exportAs: 'scDiffViewer',
  imports: [NgTemplateOutlet],
  template: `
    @if (view() === 'unified') {
      @for (row of unified(); track $index) {
        @if (row.kind === 'fold') {
          <ng-container
            [ngTemplateOutlet]="foldButton"
            [ngTemplateOutletContext]="{ $implicit: row }"
          />
        } @else {
          <div
            data-slot="diff-line"
            [attr.data-variant]="row.kind"
            [class]="unifiedLineClass"
            [style.grid-template-columns]="unifiedColumns()"
          >
            <span aria-hidden="true" [class]="numberClass">{{
              row.oldNumber
            }}</span>
            <span aria-hidden="true" [class]="numberClass">{{
              row.newNumber
            }}</span>
            <ng-container
              [ngTemplateOutlet]="content"
              [ngTemplateOutletContext]="{ $implicit: row }"
            />
          </div>
        }
      }
    } @else {
      @for (row of split(); track $index) {
        @if (row.kind === 'fold') {
          <ng-container
            [ngTemplateOutlet]="foldButton"
            [ngTemplateOutletContext]="{ $implicit: row }"
          />
        } @else {
          <div data-slot="diff-row" class="grid grid-cols-2">
            @for (cell of [row.left, row.right]; track $index) {
              @if (cell) {
                <div
                  data-slot="diff-line"
                  [attr.data-variant]="cell.kind"
                  [attr.data-side]="$index === 0 ? 'old' : 'new'"
                  [class]="splitLineClass"
                  [style.grid-template-columns]="splitColumns()"
                >
                  <span aria-hidden="true" [class]="numberClass">{{
                    $index === 0 ? cell.oldNumber : cell.newNumber
                  }}</span>
                  <ng-container
                    [ngTemplateOutlet]="content"
                    [ngTemplateOutletContext]="{ $implicit: cell }"
                  />
                </div>
              } @else {
                <div data-slot="diff-placeholder" class="bg-muted/40"></div>
              }
            }
          </div>
        }
      }
    }

    <ng-template #content let-cell>
      <span aria-hidden="true" [class]="signClass">{{ sign(cell.kind) }}</span>
      @switch (cell.kind) {
        @case ('added') {
          <ins [class]="contentClass">
            @for (piece of cell.pieces; track $index) {
              <span
                [style]="piece.style"
                [class]="pieceClass(piece, 'added')"
                >{{ piece.content }}</span
              >
            }
          </ins>
        }
        @case ('removed') {
          <del [class]="contentClass">
            @for (piece of cell.pieces; track $index) {
              <span
                [style]="piece.style"
                [class]="pieceClass(piece, 'removed')"
                >{{ piece.content }}</span
              >
            }
          </del>
        }
        @default {
          <span [class]="contentClass">
            @for (piece of cell.pieces; track $index) {
              <span [style]="piece.style" [class]="tokenClass">{{
                piece.content
              }}</span>
            }
          </span>
        }
      }
    </ng-template>

    <ng-template #foldButton let-fold>
      <button
        type="button"
        data-slot="diff-fold"
        [class]="foldClass"
        (click)="expand(fold.id)"
      >
        <ng-container
          [ngTemplateOutlet]="foldTemplate()?.template ?? null"
          [ngTemplateOutletContext]="{ $implicit: fold.lines.length }"
        />
      </button>
    </ng-template>
  `,
  host: {
    'data-slot': 'diff-viewer',
    dir: 'ltr',
    tabindex: '0',
    '[attr.data-view]': 'view()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScDiffViewer {
  private readonly highlighter = inject(SC_CODE_HIGHLIGHTER, {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly oldText = input('');
  readonly newText = input('');
  /** The texts' language (`typescript`, `json`, `css`…), for highlighting. */
  readonly language = input('plaintext');
  /** One column, or side by side. */
  readonly view = model<ScDiffView>('unified');
  /** All whitespace ignored when comparing lines. */
  readonly ignoreWhitespace = input(false, { transform: booleanAttribute });
  readonly ignoreCase = input(false, { transform: booleanAttribute });
  /** Unchanged lines kept next to each change; the rest folded (with a `scDiffViewerFold` template). `null`: none folded. */
  readonly context = input<number | null>(null);

  protected readonly foldTemplate = contentChild(ScDiffViewerFold);

  private readonly expanded = signal<ReadonlySet<number>>(new Set());

  private readonly oldLines = computed(() => textLines(this.oldText()));
  private readonly newLines = computed(() => textLines(this.newText()));

  /** The lines, compared: kept, added, removed. */
  readonly lines = computed(() =>
    diffTexts(this.oldText(), this.newText(), {
      ignoreWhitespace: this.ignoreWhitespace(),
      ignoreCase: this.ignoreCase(),
    }),
  );
  readonly additions = computed(
    () => this.lines().filter((line) => line.kind === 'added').length,
  );
  readonly deletions = computed(
    () => this.lines().filter((line) => line.kind === 'removed').length,
  );
  /** Nothing changed. */
  readonly identical = computed(() => !this.additions() && !this.deletions());

  private readonly tokens = signal<{
    readonly old: string;
    readonly new: string;
    readonly language: string;
    readonly lines: { old: ScCodeToken[][]; new: ScCodeToken[][] };
  } | null>(null);

  private readonly rows = computed<ScDiffRow[]>(() =>
    foldLines(
      this.lines(),
      this.foldTemplate() ? this.context() : null,
      this.expanded(),
    ),
  );

  protected readonly unified = computed<UnifiedRow[]>(() =>
    this.rows().map((row) => (row.kind === 'fold' ? row : this.cell(row))),
  );

  protected readonly split = computed<SplitRow[]>(() =>
    splitRows(this.rows()).map((row) =>
      row.kind === 'fold'
        ? row
        : {
            kind: 'pair' as const,
            left: row.left ? this.cell(row.left) : null,
            right: row.right ? this.cell(row.right) : null,
          },
    ),
  );

  /** Wide enough for the last line's number. */
  private readonly digits = computed(
    () =>
      String(Math.max(this.oldLines().length, this.newLines().length)).length,
  );
  protected readonly unifiedColumns = computed(
    () => `${this.digits() + 2}ch ${this.digits() + 2}ch 2ch 1fr`,
  );
  protected readonly splitColumns = computed(
    () => `${this.digits() + 2}ch 2ch 1fr`,
  );

  protected readonly unifiedLineClass = 'grid min-h-lh min-w-max';
  protected readonly splitLineClass =
    'grid min-h-lh min-w-0 data-[variant=added]:bg-muted data-[variant=removed]:bg-destructive/10';
  protected readonly numberClass =
    'select-none pe-2 text-end text-muted-foreground in-data-[variant=removed]:text-destructive';
  protected readonly signClass =
    'select-none text-muted-foreground in-data-[variant=removed]:text-destructive';
  protected readonly contentClass = 'min-w-0 no-underline';
  protected readonly tokenClass =
    'text-(--shiki-light) dark:text-(--shiki-dark)';
  protected readonly foldClass = cn(
    'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground block w-full px-3 py-1 text-start font-sans text-xs outline-none',
    'focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:ring-inset',
  );

  protected readonly class = computed(() =>
    cn(
      'min-h-0 min-w-0 overflow-auto py-2 text-start font-mono leading-relaxed whitespace-pre outline-none scrollbar-thin',
      'group-has-data-[slot=code-block-header]/code-block:pt-1.5',
      '[&_[data-slot=diff-line][data-variant=added]]:bg-muted [&_[data-slot=diff-line][data-variant=removed]]:bg-destructive/10',
      'data-[view=split]:overflow-x-hidden data-[view=split]:[&_[data-slot=diff-line]>:last-child]:whitespace-pre-wrap data-[view=split]:[&_[data-slot=diff-line]>:last-child]:wrap-break-word',
      this.classInput(),
    ),
  );

  constructor() {
    // Each text highlighted whole (so multi-line strings and comments stay
    // right), then line by line; the last request wins.
    let request = 0;
    effect(() => {
      const oldText = this.oldLines().join('\n');
      const newText = this.newLines().join('\n');
      const language = this.language();
      const highlighter = this.highlighter;
      if (!highlighter) return;
      const id = ++request;
      Promise.all([
        highlighter.highlight(oldText, language),
        highlighter.highlight(newText, language),
      ])
        .then(([oldTokens, newTokens]) => {
          if (id === request && oldTokens && newTokens)
            this.tokens.set({
              old: oldText,
              new: newText,
              language,
              lines: { old: oldTokens, new: newTokens },
            });
        })
        .catch(() => undefined);
    });
  }

  protected sign(kind: ScDiffLine['kind']): string {
    return kind === 'added' ? '+' : kind === 'removed' ? '−' : '';
  }

  protected pieceClass(piece: Piece, kind: 'added' | 'removed'): string {
    return cn(
      this.tokenClass,
      piece.changed &&
        (kind === 'added'
          ? 'bg-foreground/10 rounded-sm'
          : 'bg-destructive/20 rounded-sm'),
    );
  }

  protected expand(id: number): void {
    this.expanded.update((ids) => new Set([...ids, id]));
  }

  /** A line, ready to draw: its numbers, and its pieces — tokens cut where words changed. */
  private cell(line: ScDiffLine): Cell {
    const side = line.kind === 'added' ? 'new' : 'old';
    const index = (side === 'new' ? line.new : line.old) ?? 0;
    const text =
      (side === 'new' ? this.newLines() : this.oldLines())[index] ?? '';
    const tokens = this.tokensOf(side)?.[index] ?? [
      { content: text, style: {} },
    ];
    return {
      kind: line.kind,
      oldNumber: line.old === undefined ? null : line.old + 1,
      newNumber: line.new === undefined ? null : line.new + 1,
      pieces: cut(tokens, line.changes ?? []),
    };
  }

  private tokensOf(side: 'old' | 'new'): ScCodeToken[][] | null {
    const tokens = this.tokens();
    if (
      !tokens ||
      tokens.language !== this.language() ||
      tokens.old !== this.oldLines().join('\n') ||
      tokens.new !== this.newLines().join('\n')
    )
      return null;
    return tokens.lines[side];
  }
}

/** Tokens cut at the changed ranges' edges: each piece changed or not. */
function cut(
  tokens: readonly ScCodeToken[],
  ranges: readonly (readonly [number, number])[],
): Piece[] {
  const pieces: Piece[] = [];
  let at = 0;
  for (const token of tokens) {
    const start = at;
    const end = at + token.content.length;
    const edges = new Set([start, end]);
    for (const [from, to] of ranges) {
      if (from > start && from < end) edges.add(from);
      if (to > start && to < end) edges.add(to);
    }
    const points = [...edges].sort((a, b) => a - b);
    for (let i = 0; i < points.length - 1; i++) {
      const [from, to] = [points[i], points[i + 1]];
      pieces.push({
        content: token.content.slice(from - start, to - start),
        style: token.style,
        changed: ranges.some(([a, b]) => from >= a && to <= b),
      });
    }
    at = end;
  }
  return pieces;
}
