import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScCopyButton } from '@semantic-components/ui-lab';
import BasicCodeViewerDemoContainer from './demos/basic-code-viewer-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-code-viewer-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
    BasicCodeViewerDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Code Viewer</h1>
        <p class="text-muted-foreground">
          Display syntax-highlighted code with copy functionality.
        </p>
        <app-component-badges path="code-viewer" />
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button scCopyButton [value]="usageCode"></button>
          </div>
          <div
            scCodeViewerContent
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-code-viewer-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CodeViewerPage {
  readonly usageCode = `import {
  ScCodeViewer,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
  ScCodeViewerContent,
  ScCopyButton,
} from '@semantic-components/code';

@Component({
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyButton,
    TocHeading,
  ],
  template: \`
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>app.component.ts</span>
        <button scCopyButton [value]="code"></button>
      </div>
      <div
        scCodeViewerContent
        [code]="code"
        language="typescript"
        [showLineNumbers]="true"
      ></div>
    </div>
  \`,
})
export class MyComponent {
  code = 'const hello = "world";';
}`;
}
