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
  selector: 'app-basic-diff-viewer-demo',
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
      [oldText]="oldCode"
      [newText]="newCode"
      #diff="scDiffViewer"
    >
      <div scDiffViewerHeader>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-muted-foreground">main.ts (original)</span>
          <span class="text-muted-foreground">→</span>
          <span class="text-muted-foreground">main.ts (modified)</span>
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
              <div scDiffViewerPaneHeader variant="old">main.ts (original)</div>
              <sc-diff-viewer-lines side="old" />
            </div>
            <div scDiffViewerPane side="new">
              <div scDiffViewerPaneHeader variant="new">main.ts (modified)</div>
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
export class BasicDiffViewerDemo {
  oldCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello World</h1>',
})
export class App {
  title = 'my-app';

  ngOnInit() {
    console.log('App initialized');
  }
}`;

  newCode = `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: '<h1>{{ title }}</h1>',
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  title = 'My Application';

  ngOnInit(): void {
    console.log('App initialized');
    this.loadData();
  }

  private loadData(): void {
    // Load initial data
  }
}`;
}
