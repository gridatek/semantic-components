import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: `
    <sc-diff-viewer
      [oldText]="oldCode"
      [newText]="newCode"
      [oldTitle]="'main.ts (original)'"
      [newTitle]="'main.ts (modified)'"
    />
  `,
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
