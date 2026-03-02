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
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-code-viewer-demo',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    CdkCopyToClipboard,
    SiCopyIcon,
  ],
  template: \`
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>app.ts</span>
        <button
          type="button"
          [cdkCopyToClipboard]="sampleCode()"
          class="inline-flex items-center justify-center size-9 rounded-md hover:bg-accent hover:text-accent-foreground"
          aria-label="Copy to clipboard"
        >
          <svg siCopyIcon class="size-4"></svg>
        </button>
      </div>
      <div
        scCodeViewerContent
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
