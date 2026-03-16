import {
  Directive,
  InjectionToken,
  computed,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  DiffLine,
  DiffResult,
  computeDiff,
  computeWordDiff,
} from './diff-algorithm';

export type DiffViewMode = 'split' | 'unified';

export type { DiffLine, DiffResult } from './diff-algorithm';

export const SC_DIFF_VIEWER = new InjectionToken<ScDiffViewer>('ScDiffViewer');

@Directive({
  selector: '[scDiffViewer]',
  exportAs: 'scDiffViewer',
  providers: [{ provide: SC_DIFF_VIEWER, useExisting: ScDiffViewer }],
  host: {
    'data-slot': 'diff-viewer',
    '[class]': 'class()',
  },
})
export class ScDiffViewer {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly oldText = input<string>('');
  readonly newText = input<string>('');
  readonly oldTitle = input<string>('');
  readonly newTitle = input<string>('');
  readonly defaultViewMode = input<DiffViewMode>('split');
  readonly showWordDiff = input(true);
  readonly ignoreWhitespace = input(false);
  readonly ignoreCase = input(false);

  readonly viewMode = signal<DiffViewMode>('split');

  constructor() {
    this.viewMode.set(this.defaultViewMode());
  }

  protected readonly class = computed(() =>
    cn(
      'block overflow-hidden rounded-lg border bg-background',
      this.classInput(),
    ),
  );

  readonly diffResult = computed((): DiffResult => {
    const oldText = this.oldText();
    const newText = this.newText();

    if (!oldText && !newText) {
      return { lines: [], additions: 0, deletions: 0, unchanged: 0 };
    }

    return computeDiff(oldText, newText, {
      ignoreWhitespace: this.ignoreWhitespace(),
      ignoreCase: this.ignoreCase(),
    });
  });

  getLineClass(type: string): string {
    const baseClass = 'flex items-start leading-6 min-h-6';

    switch (type) {
      case 'added':
        return cn(
          baseClass,
          'bg-green-500/10 text-green-900 dark:text-green-100',
        );
      case 'removed':
        return cn(baseClass, 'bg-red-500/10 text-red-900 dark:text-red-100');
      case 'unchanged':
        return cn(baseClass, 'bg-background');
      default:
        return baseClass;
    }
  }

  highlightLine(line: DiffLine, side: 'old' | 'new'): string {
    if (!this.showWordDiff()) {
      const content =
        side === 'old'
          ? (line.oldContent ?? line.content ?? '')
          : (line.newContent ?? line.content ?? '');
      return this.escapeHtml(content);
    }

    if (line.type === 'unchanged') {
      return this.escapeHtml(line.content ?? '');
    }

    if (line.type === 'added' || line.type === 'removed') {
      const content =
        side === 'old' ? (line.oldContent ?? '') : (line.newContent ?? '');
      return this.escapeHtml(content);
    }

    if (line.oldContent !== undefined && line.newContent !== undefined) {
      const { oldParts, newParts } = computeWordDiff(
        line.oldContent,
        line.newContent,
      );
      const parts = side === 'old' ? oldParts : newParts;

      return parts
        .map((part) => {
          const escaped = this.escapeHtml(part.text);
          if (part.changed) {
            const className = side === 'old' ? 'word-removed' : 'word-added';
            return `<span class="${className}">${escaped}</span>`;
          }
          return escaped;
        })
        .join('');
    }

    const content =
      side === 'old'
        ? (line.oldContent ?? line.content ?? '')
        : (line.newContent ?? line.content ?? '');
    return this.escapeHtml(content);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/ /g, '&nbsp;')
      .replace(/\t/g, '&nbsp;&nbsp;');
  }
}
