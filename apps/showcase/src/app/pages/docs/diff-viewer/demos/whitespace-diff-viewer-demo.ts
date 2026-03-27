import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScToolbar,
  ScToolbarToggle,
  ScToolbarToggleGroup,
} from '@semantic-components/ui';
import {
  ScDiffViewer,
  ScDiffViewerContent,
  ScDiffViewerEmpty,
  ScDiffViewerHeader,
  ScDiffViewerLine,
  ScDiffViewerLineContent,
  ScDiffViewerLineNumber,
  ScDiffViewerLinePlaceholder,
  ScDiffViewerLineSign,
  ScDiffViewerModeSwitch,
  ScDiffViewerPane,
  ScDiffViewerSplit,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-whitespace-diff-viewer-demo',
  imports: [
    ScDiffViewer,
    ScDiffViewerHeader,
    ScDiffViewerModeSwitch,
    ScToolbar,
    ScToolbarToggle,
    ScToolbarToggleGroup,
    ScDiffViewerContent,
    ScDiffViewerSplit,
    ScDiffViewerPane,
    ScDiffViewerLine,
    ScDiffViewerLineNumber,
    ScDiffViewerLineSign,
    ScDiffViewerLineContent,
    ScDiffViewerLinePlaceholder,
    ScDiffViewerEmpty,
  ],
  template: `
    <p class="text-muted-foreground mb-4 text-sm">
      The following texts differ only in whitespace but are shown as identical.
    </p>
    <div
      scDiffViewer
      [oldText]="'hello   world'"
      [newText]="'hello world'"
      [ignoreWhitespace]="true"
      #diff="scDiffViewer"
    >
      <div scDiffViewerHeader>
        <div class="flex items-center gap-3 text-sm">
          <span class="text-green-600 dark:text-green-400">
            +{{ diff.diffResult().additions }}
          </span>
          <span class="text-red-600 dark:text-red-400">
            -{{ diff.diffResult().deletions }}
          </span>
        </div>
        <div scToolbar scDiffViewerModeSwitch>
          <div scToolbarToggleGroup>
            <button scToolbarToggle value="split">Split</button>
            <button scToolbarToggle value="unified">Unified</button>
          </div>
        </div>
      </div>
      <div scDiffViewerContent>
        @if (diff.viewMode() === 'split') {
          <div scDiffViewerSplit>
            <div scDiffViewerPane side="old">
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
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhitespaceDiffViewerDemo {}
