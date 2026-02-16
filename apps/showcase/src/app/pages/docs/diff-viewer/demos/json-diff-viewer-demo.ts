import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScDiffViewer } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-json-diff-viewer-demo',
  imports: [ScDiffViewer],
  template: `
    <sc-diff-viewer
      [oldText]="oldJson"
      [newText]="newJson"
      [oldTitle]="'config.json (before)'"
      [newTitle]="'config.json (after)'"
    />
  `,
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
