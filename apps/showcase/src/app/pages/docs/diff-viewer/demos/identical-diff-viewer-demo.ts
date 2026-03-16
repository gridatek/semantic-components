import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDiffViewer,
  ScDiffViewerContent,
  ScDiffViewerEmpty,
  ScDiffViewerHeader,
  ScDiffViewerLines,
  ScDiffViewerPane,
  ScDiffViewerSplit,
  ScDiffViewerToggle,
  ScDiffViewerToggleButton,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-identical-diff-viewer-demo',
  imports: [
    ScDiffViewer,
    ScDiffViewerHeader,
    ScDiffViewerToggle,
    ScDiffViewerToggleButton,
    ScDiffViewerContent,
    ScDiffViewerSplit,
    ScDiffViewerPane,
    ScDiffViewerLines,
    ScDiffViewerEmpty,
  ],
  template: `
    <div
      scDiffViewer
      [oldText]="'const x = 1;
const y = 2;'"
      [newText]="'const x = 1;
const y = 2;'"
      #diff="scDiffViewer"
    >
      <div scDiffViewerHeader>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">file.ts</span>
          <span class="text-muted-foreground">→</span>
          <span class="text-muted-foreground">file.ts</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3 text-sm">
            <span class="text-green-600 dark:text-green-400">
              +{{ diff.diffResult().additions }}
            </span>
            <span class="text-red-600 dark:text-red-400">
              -{{ diff.diffResult().deletions }}
            </span>
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
              <sc-diff-viewer-lines side="old" />
            </div>
            <div scDiffViewerPane side="new">
              <sc-diff-viewer-lines side="new" />
            </div>
          </div>
        } @else {
          <sc-diff-viewer-lines side="unified" />
        }
        @if (diff.diffResult().lines.length === 0) {
          <div scDiffViewerEmpty>No differences found</div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdenticalDiffViewerDemo {}
