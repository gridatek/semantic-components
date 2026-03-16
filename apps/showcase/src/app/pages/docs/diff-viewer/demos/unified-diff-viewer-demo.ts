import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScDiffViewer,
  ScDiffViewerContent,
  ScDiffViewerEmpty,
  ScDiffViewerFooter,
  ScDiffViewerHeader,
  ScDiffViewerLines,
  ScDiffViewerPane,
  ScDiffViewerPaneHeader,
  ScDiffViewerSplit,
  ScDiffViewerToggle,
  ScDiffViewerToggleButton,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-unified-diff-viewer-demo',
  imports: [
    ScDiffViewer,
    ScDiffViewerHeader,
    ScDiffViewerToggle,
    ScDiffViewerToggleButton,
    ScDiffViewerContent,
    ScDiffViewerSplit,
    ScDiffViewerPane,
    ScDiffViewerPaneHeader,
    ScDiffViewerLines,
    ScDiffViewerFooter,
    ScDiffViewerEmpty,
  ],
  template: `
    <div
      scDiffViewer
      [oldText]="oldText"
      [newText]="newText"
      [defaultViewMode]="'unified'"
      #diff="scDiffViewer"
    >
      <div scDiffViewerHeader>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">Draft v1</span>
          <span class="text-muted-foreground">→</span>
          <span class="text-muted-foreground">Draft v2</span>
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
              <div scDiffViewerPaneHeader variant="old">Draft v1</div>
              <sc-diff-viewer-lines side="old" />
            </div>
            <div scDiffViewerPane side="new">
              <div scDiffViewerPaneHeader variant="new">Draft v2</div>
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
      <div scDiffViewerFooter>
        <span>{{ diff.diffResult().lines.length }} lines</span>
        <span>
          {{ diff.diffResult().additions }} additions,
          {{ diff.diffResult().deletions }} deletions,
          {{ diff.diffResult().unchanged }} unchanged
        </span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnifiedDiffViewerDemo {
  oldText = `The quick brown fox jumps over the lazy dog.

This is the first paragraph of our document.
It contains some important information.

The second paragraph discusses other topics.`;

  newText = `The quick brown fox leaps over the lazy dog.

This is the first paragraph of our revised document.
It contains some important and updated information.

The second paragraph discusses additional topics.

A new third paragraph has been added.`;
}
