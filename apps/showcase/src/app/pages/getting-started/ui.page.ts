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
import { ScLink, ScSeparator } from '@semantic-components/ui';
import { ScCopyButton } from '@semantic-components/ui-lab';

import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-ui-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCopyButton,
    ScSeparator,
    ScLink,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">UI</h1>
        <p class="text-muted-foreground">
          Install and configure the core
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            &#64;semantic-components/ui
          </code>
          package.
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
          <div scCodeViewerContent [code]="installCode" language="bash"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          2. Configure styles
        </h2>
        <p class="text-muted-foreground">
          Set up the theme styles for your project. Pick one of the two options
          below.
        </p>

        <h3 class="text-lg font-medium">Option A: Default theme</h3>
        <p class="text-muted-foreground">
          Import the pre-built styles in your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          . This includes the default shadcn theme and Angular CDK styles.
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button scCopyButton [value]="stylesDefaultCode"></button>
          </div>
          <div
            scCodeViewerContent
            [code]="stylesDefaultCode"
            language="css"
          ></div>
        </div>

        <h3 class="text-lg font-medium">Option B: Custom theme</h3>
        <p class="text-muted-foreground">
          For full control over colors, border radius, and other design tokens,
          copy the CSS variables from the shadcn/ui manual installation guide
          into your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <a
          scLink
          variant="outline"
          href="https://ui.shadcn.com/docs/installation/manual#configure-styles"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui - Manual Installation (Configure styles)
        </a>
        <p class="text-muted-foreground">
          You also need to import the Angular CDK overlay styles manually:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button scCopyButton [value]="stylesCustomCdkCode"></button>
          </div>
          <div
            scCodeViewerContent
            [code]="stylesCustomCdkCode"
            language="css"
          ></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          3. Configure Tailwind source
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source so its classes are included in
          the build. Add this to your
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
export default class UiPage {
  readonly installCode = 'npm install @semantic-components/ui';

  readonly stylesDefaultCode = '@import "@semantic-components/ui/styles";';

  readonly stylesCustomCdkCode =
    "@import url('@angular/cdk/overlay-prebuilt.css');";

  readonly sourceCode = '@source "../node_modules/@semantic-components/ui";';

  readonly usageCode = `import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-example',
  imports: [ScButton],
  template: \`
    <button scButton>Click me</button>
  \`,
})
export class ExampleComponent {}`;
}
