import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToolbar,
  ScToolbarToggle,
  ScToolbarToggleGroup,
} from '@semantic-components/ui';
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
  ScDiffViewerModeSwitch,
  ScDiffViewerPane,
  ScDiffViewerPaneHeader,
  ScDiffViewerSplit,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-json-diff-viewer-demo',
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
    ScDiffViewerPaneHeader,
    ScDiffViewerLine,
    ScDiffViewerLineNumber,
    ScDiffViewerLineSign,
    ScDiffViewerLineContent,
    ScDiffViewerLinePlaceholder,
    ScDiffViewerFooter,
    ScDiffViewerEmpty,
  ],
  template: `
    <div
      scDiffViewer
      [oldText]="oldJson"
      [newText]="newJson"
      #diff="scDiffViewer"
    >
      <div scDiffViewerHeader>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">config.json (before)</span>
          <span class="text-muted-foreground">→</span>
          <span class="text-muted-foreground">config.json (after)</span>
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
          <div scToolbar scDiffViewerModeSwitch>
            <div scToolbarToggleGroup>
              <button scToolbarToggle value="split">Split</button>
              <button scToolbarToggle value="unified">Unified</button>
            </div>
          </div>
        </div>
      </div>
      <div scDiffViewerContent>
        @if (diff.viewMode() === 'split') {
          <div scDiffViewerSplit>
            <div scDiffViewerPane side="old">
              <div scDiffViewerPaneHeader variant="old">
                config.json (before)
              </div>
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
              <div scDiffViewerPaneHeader variant="new">
                config.json (after)
              </div>
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class JsonDiffViewerDemo {
  oldJson = `{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.0"
  }
}`;

  newJson = `{
  "name": "my-project",
  "version": "1.1.0",
  "description": "A sample project with updates",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "test": "jest --coverage"
  },
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`;
}
