import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { UnifiedDiffViewerDemo } from './unified-diff-viewer-demo';

@Component({
  selector: 'app-unified-diff-viewer-demo-container',
  imports: [DemoContainer, UnifiedDiffViewerDemo],
  template: `
    <app-demo-container
      title="Unified View"
      demoUrl="/demos/diff-viewer/unified-diff-viewer-demo"
      [code]="code"
    >
      <app-unified-diff-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnifiedDiffViewerDemoContainer {
  readonly code = `import {
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
  ScDiffViewerLine,
  ScDiffViewerLineContent,
  ScDiffViewerLineNumber,
  ScDiffViewerLinePlaceholder,
  ScDiffViewerLineSign,
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
    ScDiffViewerLine,
    ScDiffViewerLineNumber,
    ScDiffViewerLineSign,
    ScDiffViewerLineContent,
    ScDiffViewerLinePlaceholder,
    ScDiffViewerFooter,
    ScDiffViewerEmpty,
  ],
  template: \`
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
              <div class="font-mono text-sm">
                @for (line of diff.diffResult().lines; track $index) {
                  @if (line.type !== 'added') {
                    <div scDiffViewerLine [type]="line.type">
                      <span scDiffViewerLineNumber>
                        {{ line.oldLineNumber || '' }}
                      </span>
                      <span scDiffViewerLineSign>
                        {{ line.type === 'removed' ? '-' : '' }}
                      </span>
                      <span
                        scDiffViewerLineContent
                        [innerHTML]="diff.highlightLine(line, 'old')"
                      ></span>
                    </div>
                  } @else {
                    <div scDiffViewerLinePlaceholder></div>
                  }
                }
              </div>
            </div>
            <div scDiffViewerPane side="new">
              <div scDiffViewerPaneHeader variant="new">Draft v2</div>
              <div class="font-mono text-sm">
                @for (line of diff.diffResult().lines; track $index) {
                  @if (line.type !== 'removed') {
                    <div scDiffViewerLine [type]="line.type">
                      <span scDiffViewerLineNumber>
                        {{ line.newLineNumber || '' }}
                      </span>
                      <span scDiffViewerLineSign>
                        {{ line.type === 'added' ? '+' : '' }}
                      </span>
                      <span
                        scDiffViewerLineContent
                        [innerHTML]="diff.highlightLine(line, 'new')"
                      ></span>
                    </div>
                  } @else {
                    <div scDiffViewerLinePlaceholder></div>
                  }
                }
              </div>
            </div>
          </div>
        } @else {
          <div class="font-mono text-sm">
            @for (line of diff.diffResult().lines; track $index) {
              <div scDiffViewerLine [type]="line.type">
                <span scDiffViewerLineNumber>
                  {{ line.oldLineNumber || '' }}
                </span>
                <span scDiffViewerLineNumber>
                  {{ line.newLineNumber || '' }}
                </span>
                <span scDiffViewerLineSign class="font-bold">
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
                  scDiffViewerLineContent
                  [innerHTML]="
                    diff.highlightLine(
                      line,
                      line.type === 'removed' ? 'old' : 'new'
                    )
                  "
                ></span>
              </div>
            }
          </div>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnifiedDiffViewerDemo {
  oldText = \`The quick brown fox jumps over the lazy dog.

This is the first paragraph of our document.
It contains some important information.

The second paragraph discusses other topics.\`;

  newText = \`The quick brown fox leaps over the lazy dog.

This is the first paragraph of our revised document.
It contains some important and updated information.

The second paragraph discusses additional topics.

A new third paragraph has been added.\`;
}`;
}
