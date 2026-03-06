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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicCodeViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-code-viewer-demo',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: \`
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>app.ts</span>
        <button
          scButton
          variant="ghost"
          size="icon"
          [scCopyToClipboard]="sampleCode()"
          #copy="scCopyToClipboard"
          aria-label="Copy to clipboard"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
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
  host: { class: 'block w-full' },
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
