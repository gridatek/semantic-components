import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import {
  computeDiff,
  computeWordDiff,
  DiffLine,
  DiffResult,
} from './diff-algorithm';

export type DiffViewMode = 'split' | 'unified';

export type { DiffLine, DiffResult } from './diff-algorithm';

@Component({
  selector: 'sc-diff-viewer',
  template: `
    <div [class]="containerClass()">
      <!-- Header -->
      @if (showHeader()) {
        <div
          class="flex items-center justify-between px-4 py-2 border-b bg-muted/30"
        >
          <div class="flex items-center gap-4">
            @if (oldTitle() || newTitle()) {
              <div class="flex items-center gap-2 text-sm">
                @if (oldTitle()) {
                  <span class="text-muted-foreground">{{ oldTitle() }}</span>
                }
                @if (oldTitle() && newTitle()) {
                  <span class="text-muted-foreground">→</span>
                }
                @if (newTitle()) {
                  <span class="text-muted-foreground">{{ newTitle() }}</span>
                }
              </div>
            }
          </div>
          <div class="flex items-center gap-4">
            <!-- Stats -->
            <div class="flex items-center gap-3 text-sm">
              <span class="text-green-600 dark:text-green-400">
                +{{ diffResult().additions }}
              </span>
              <span class="text-red-600 dark:text-red-400">
                -{{ diffResult().deletions }}
              </span>
            </div>
            <!-- View mode toggle -->
            @if (showViewModeToggle()) {
              <div class="flex items-center border rounded-md overflow-hidden">
                <button
                  type="button"
                  (click)="viewMode.set('split')"
                  [class]="viewModeButtonClass(viewMode() === 'split')"
                >
                  Split
                </button>
                <button
                  type="button"
                  (click)="viewMode.set('unified')"
                  [class]="viewModeButtonClass(viewMode() === 'unified')"
                >
                  Unified
                </button>
              </div>
            }
          </div>
        </div>
      }

      <!-- Diff content -->
      <div class="overflow-auto" [style.max-height]="maxHeight()">
        @if (viewMode() === 'split') {
          <!-- Split view -->
          <div class="flex">
            <!-- Old (left) side -->
            <div class="flex-1 border-r min-w-0">
              @if (showSideHeaders()) {
                <div
                  class="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-red-500/5 border-b"
                >
                  {{ oldTitle() || 'Original' }}
                </div>
              }
              <div class="font-mono text-sm">
                @for (line of diffResult().lines; track $index) {
                  @if (line.type !== 'added') {
                    <div [class]="getLineClass(line.type, 'old')">
                      <span
                        class="inline-block w-12 px-2 text-right text-muted-foreground select-none border-r"
                      >
                        {{ line.oldLineNumber || '' }}
                      </span>
                      <span class="inline-block w-6 text-center select-none">
                        {{ line.type === 'removed' ? '-' : '' }}
                      </span>
                      <span
                        class="px-2"
                        [innerHTML]="highlightLine(line, 'old')"
                      ></span>
                    </div>
                  } @else {
                    <div class="h-6 bg-muted/30"></div>
                  }
                }
              </div>
            </div>
            <!-- New (right) side -->
            <div class="flex-1 min-w-0">
              @if (showSideHeaders()) {
                <div
                  class="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-green-500/5 border-b"
                >
                  {{ newTitle() || 'Modified' }}
                </div>
              }
              <div class="font-mono text-sm">
                @for (line of diffResult().lines; track $index) {
                  @if (line.type !== 'removed') {
                    <div [class]="getLineClass(line.type, 'new')">
                      <span
                        class="inline-block w-12 px-2 text-right text-muted-foreground select-none border-r"
                      >
                        {{ line.newLineNumber || '' }}
                      </span>
                      <span class="inline-block w-6 text-center select-none">
                        {{ line.type === 'added' ? '+' : '' }}
                      </span>
                      <span
                        class="px-2"
                        [innerHTML]="highlightLine(line, 'new')"
                      ></span>
                    </div>
                  } @else {
                    <div class="h-6 bg-muted/30"></div>
                  }
                }
              </div>
            </div>
          </div>
        } @else {
          <!-- Unified view -->
          <div class="font-mono text-sm">
            @for (line of diffResult().lines; track $index) {
              <div [class]="getLineClass(line.type, 'unified')">
                <span
                  class="inline-block w-12 px-2 text-right text-muted-foreground select-none border-r"
                >
                  {{ line.oldLineNumber || '' }}
                </span>
                <span
                  class="inline-block w-12 px-2 text-right text-muted-foreground select-none border-r"
                >
                  {{ line.newLineNumber || '' }}
                </span>
                <span
                  class="inline-block w-6 text-center select-none font-bold"
                >
                  @switch (line.type) {
                    @case ('added') {
                      <span class="text-green-600 dark:text-green-400">+</span>
                    }
                    @case ('removed') {
                      <span class="text-red-600 dark:text-red-400">-</span>
                    }
                    @default {}
                  }
                </span>
                <span
                  class="px-2"
                  [innerHTML]="
                    highlightLine(line, line.type === 'removed' ? 'old' : 'new')
                  "
                ></span>
              </div>
            }
          </div>
        }

        <!-- Empty state -->
        @if (diffResult().lines.length === 0) {
          <div
            class="flex items-center justify-center py-12 text-muted-foreground"
          >
            No differences found
          </div>
        }

        @if (!oldText() && !newText()) {
          <div
            class="flex items-center justify-center py-12 text-muted-foreground"
          >
            No content to compare
          </div>
        }
      </div>

      <!-- Footer stats -->
      @if (showFooter()) {
        <div
          class="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground bg-muted/30"
        >
          <span>{{ diffResult().lines.length }} lines</span>
          <span>
            {{ diffResult().additions }} additions,
            {{ diffResult().deletions }} deletions,
            {{ diffResult().unchanged }} unchanged
          </span>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .word-added {
      background-color: rgba(34, 197, 94, 0.3);
      border-radius: 2px;
    }

    .word-removed {
      background-color: rgba(239, 68, 68, 0.3);
      border-radius: 2px;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDiffViewer {
  // Inputs
  readonly oldText = input<string>('');
  readonly newText = input<string>('');
  readonly oldTitle = input<string>('');
  readonly newTitle = input<string>('');
  readonly defaultViewMode = input<DiffViewMode>('split');
  readonly showHeader = input(true);
  readonly showFooter = input(true);
  readonly showViewModeToggle = input(true);
  readonly showSideHeaders = input(true);
  readonly showWordDiff = input(true);
  readonly ignoreWhitespace = input(false);
  readonly ignoreCase = input(false);
  readonly maxHeight = input<string>('600px');
  readonly class = input<string>('');

  // Internal state
  readonly viewMode = signal<DiffViewMode>('split');

  constructor() {
    // Set initial view mode from input
    this.viewMode.set(this.defaultViewMode());
  }

  protected readonly diffResult = computed((): DiffResult => {
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

  protected readonly containerClass = computed(() =>
    cn('border rounded-lg overflow-hidden bg-background', this.class()),
  );

  protected viewModeButtonClass(active: boolean): string {
    return cn(
      'px-3 py-1 text-xs transition-colors',
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-background hover:bg-muted',
    );
  }

  protected getLineClass(
    type: string,
    side: 'old' | 'new' | 'unified',
  ): string {
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

  protected highlightLine(line: DiffLine, side: 'old' | 'new'): string {
    if (!this.showWordDiff()) {
      const content =
        side === 'old'
          ? (line.oldContent ?? line.content ?? '')
          : (line.newContent ?? line.content ?? '');
      return this.escapeHtml(content);
    }

    // For unchanged lines, just return the content
    if (line.type === 'unchanged') {
      return this.escapeHtml(line.content ?? '');
    }

    // For added/removed lines, try to find a matching line for word diff
    if (line.type === 'added' || line.type === 'removed') {
      const content =
        side === 'old' ? (line.oldContent ?? '') : (line.newContent ?? '');
      return this.escapeHtml(content);
    }

    // For modified lines, compute word diff
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
