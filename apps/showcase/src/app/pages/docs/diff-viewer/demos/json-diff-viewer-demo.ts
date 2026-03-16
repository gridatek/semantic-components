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
  selector: 'app-json-diff-viewer-demo',
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
              <div scDiffViewerPaneHeader variant="old">
                config.json (before)
              </div>
              <sc-diff-viewer-lines side="old" />
            </div>
            <div scDiffViewerPane side="new">
              <div scDiffViewerPaneHeader variant="new">
                config.json (after)
              </div>
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
