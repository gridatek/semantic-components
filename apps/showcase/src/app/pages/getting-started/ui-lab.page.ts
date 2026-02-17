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
          the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          1. Install the package
        </h2>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>terminal</span>
            <button scCopyButton [value]="installCode"></button>
          </div>
          <div
            scCodeViewerContent
            [code]="installCode"
            language="bash"
          ></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          2. Configure Tailwind source
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button scCopyButton [value]="sourceCode"></button>
          </div>
          <div scCodeViewerContent [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">Usage</h2>
        <p class="text-muted-foreground">
          Import and use components in your Angular templates:
        </p>
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UiLabPage {
  readonly installCode = 'npm install @semantic-components/ui-lab';

  readonly sourceCode =
    '@source "../node_modules/@semantic-components/ui-lab";';

  readonly usageCode = `import { ScAlert } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-example',
  imports: [ScAlert],
  template: \`
    <div scAlert variant="info">
      <p>This is an informational alert message.</p>
    </div>
  \`,
})
export class ExampleComponent {}`;
}
