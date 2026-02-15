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
import { ScCopyButton, ScSeparator } from '@semantic-components/ui-lab';

import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-ui-lab-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCopyButton,
    ScSeparator,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">UI Lab</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            &#64;semantic-components/ui-lab
          </code>
          package. This contains experimental and advanced components. Requires
          the core library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          1. Install the package
        </h2>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="installCode"></button>
          </div>
          <div
            sc-code-viewer-content
            [code]="installCode"
            language="bash"
          ></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          2. Configure Tailwind source
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>css</span>
            <button sc-copy-button [value]="sourceCode"></button>
          </div>
          <div sc-code-viewer-content [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <p class="text-muted-foreground">
          Import and use components in your Angular templates:
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>angular-ts</span>
            <button sc-copy-button [value]="usageCode"></button>
          </div>
          <div
            sc-code-viewer-content
            [code]="usageCode"
            language="angular-ts"
          ></div>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UiLabPage {
  readonly installCode = 'npm install @semantic-components/ui-lab';

  readonly sourceCode =
    '@source "../node_modules/@semantic-components/ui-lab";';

  readonly usageCode = `import { ScTabs, ScTabList, ScTab, ScTabPanel } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-example',
  imports: [ScTabs, ScTabList, ScTab, ScTabPanel],
  template: \`
    <div scTabs>
      <div scTabList [selectedTab]="'tab1'" class="grid w-full grid-cols-2">
        <button scTab value="tab1">Tab 1</button>
        <button scTab value="tab2">Tab 2</button>
      </div>
      <div scTabPanel value="tab1">Content 1</div>
      <div scTabPanel value="tab2">Content 2</div>
    </div>
  \`,
})
export class ExampleComponent {}`;
}
