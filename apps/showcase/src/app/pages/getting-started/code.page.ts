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
  selector: 'app-code-page',
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
        <h1 class="text-3xl font-bold tracking-tight">Code</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            &#64;semantic-components/code
          </code>
          package. Provides code viewer and code editor components powered by
          Shiki. Requires the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          1. Install the package
        </h2>
        <p class="text-muted-foreground">
          Install the code library and its peer dependency
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">shiki</code>
          .
        </p>
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
          2. Configure styles
        </h2>
        <p class="text-muted-foreground">
          Import the code library styles in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button scCopyButton [value]="stylesCode"></button>
          </div>
          <div scCodeViewerContent [code]="stylesCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          3. Configure Tailwind source
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
          Import and use the code viewer in your Angular templates:
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
export default class CodeInstallPage {
  readonly installCode = 'npm install @semantic-components/code shiki';

  readonly stylesCode = '@import "@semantic-components/code/styles";';

  readonly sourceCode = '@source "../node_modules/@semantic-components/code";';

  readonly usageCode = `import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';

@Component({
  selector: 'app-example',
  imports: [ScCodeViewer, ScCodeViewerContent, ScCodeViewerHeader, ScCodeViewerLabel],
  template: \`
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>typescript</span>
      </div>
      <div scCodeViewerContent [code]="code" language="typescript"></div>
    </div>
  \`,
})
export class ExampleComponent {
  code = 'const greeting = "Hello, world!";';
}`;
}
