import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicCodeViewerDemo } from './basic-code-viewer-demo';

@Component({
  selector: 'app-basic-code-viewer-demo-container',
  imports: [DemoContainer, BasicCodeViewerDemo],
  template: `
    <app-demo-container title="Basic Code Viewer" [code]="code">
      <app-basic-code-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicCodeViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
  ScCopyButton,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-code-viewer-demo',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
  ],
  template: \`
    <div sc-code-viewer>
      <div sc-code-viewer-header>
        <span sc-code-viewer-label>app.ts</span>
        <button sc-copy-button [value]="sampleCode()"></button>
      </div>
      <div
        sc-code-viewer-content
        [code]="sampleCode()"
        language="typescript"
        [showLineNumbers]="true"
      ></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCodeViewerDemo {
  readonly sampleCode = signal(\`import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \\\`
    <div class="container">
      <h1>Welcome to Angular</h1>
      <p>This is a sample component.</p>
    </div>
  \\\`,
})
export class App {
  title = 'my-app';
}\`);
}`;
}
