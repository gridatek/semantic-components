import {
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
import { ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-code-viewer-demo',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: `
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>app.ts</span>
        <button
          type="button"
          [scCopyToClipboard]="sampleCode()"
          #copy="scCopyToClipboard"
          class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md"
          aria-label="Copy to clipboard"
        >
          @if (copy.copied()) {
            <svg siCheckIcon class="size-4"></svg>
          } @else {
            <svg siCopyIcon class="size-4"></svg>
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicCodeViewerDemo {
  readonly sampleCode = signal(`import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="container">
      <h1>Welcome to Angular</h1>
      <p>This is a sample component.</p>
    </div>
  \`,
})
export class App {
  title = 'my-app';
}`);
}
