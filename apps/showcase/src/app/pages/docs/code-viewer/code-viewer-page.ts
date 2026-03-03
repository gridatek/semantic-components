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
import { ScCopyToClipboard } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicCodeViewerDemoContainer from './demos/basic-code-viewer-demo-container';

@Component({
  selector: 'app-code-viewer-page',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
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
            <button
              type="button"
              [scCopyToClipboard]="usageCode"
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
  readonly usageCode = `import { ScCopyToClipboard } from '@semantic-components/ui';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
  ],
  template: \`
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>app.component.ts</span>
        <button
          type="button"
          [scCopyToClipboard]="code"
          #copy="scCopyToClipboard"
          class="inline-flex items-center justify-center size-9 rounded-md hover:bg-accent hover:text-accent-foreground"
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
