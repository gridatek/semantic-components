import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { DiffLine } from './diff-algorithm';
import { SC_DIFF_VIEWER } from './diff-viewer';

@Component({
  selector: 'sc-diff-viewer-lines',
  template: `
    @if (side() === 'unified') {
      <div class="font-mono text-sm">
        @for (line of diffViewer.diffResult().lines; track $index) {
          <div [class]="diffViewer.getLineClass(line.type)">
            <span
              class="text-muted-foreground inline-block w-12 border-r px-2 text-right select-none"
            >
              {{ line.oldLineNumber || '' }}
            </span>
            <span
              class="text-muted-foreground inline-block w-12 border-r px-2 text-right select-none"
            >
              {{ line.newLineNumber || '' }}
            </span>
            <span class="inline-block w-6 text-center font-bold select-none">
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
                diffViewer.highlightLine(
                  line,
                  line.type === 'removed' ? 'old' : 'new'
                )
              "
            ></span>
          </div>
        }
      </div>
    } @else {
      <div class="font-mono text-sm">
        @for (line of diffViewer.diffResult().lines; track $index) {
          @if (shouldShow(line)) {
            <div [class]="diffViewer.getLineClass(line.type)">
              <span
                class="text-muted-foreground inline-block w-12 border-r px-2 text-right select-none"
              >
                {{
                  side() === 'old'
                    ? line.oldLineNumber || ''
                    : line.newLineNumber || ''
                }}
              </span>
              <span class="inline-block w-6 text-center select-none">
                {{ getSign(line.type) }}
              </span>
              <span
                class="px-2"
                [innerHTML]="diffViewer.highlightLine(line, splitSide())"
              ></span>
            </div>
          } @else {
            <div class="bg-muted/30 h-6"></div>
          }
        }
      </div>
    }
  `,
  styles: `
    .word-added {
      background-color: rgba(34, 197, 94, 0.3);
      border-radius: 2px;
    }

    .word-removed {
      background-color: rgba(239, 68, 68, 0.3);
      border-radius: 2px;
    }
  `,
  host: {
    'data-slot': 'diff-viewer-lines',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScDiffViewerLines {
  protected readonly diffViewer = inject(SC_DIFF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly side = input.required<'old' | 'new' | 'unified'>();

  protected readonly class = computed(() => cn('block', this.classInput()));

  protected readonly splitSide = computed(() => this.side() as 'old' | 'new');

  protected shouldShow(line: DiffLine): boolean {
    const s = this.side();
    if (s === 'old') return line.type !== 'added';
    if (s === 'new') return line.type !== 'removed';
    return true;
  }

  protected getSign(type: string): string {
    const s = this.side();
    if (s === 'old' && type === 'removed') return '-';
    if (s === 'new' && type === 'added') return '+';
    return '';
  }
}
