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
import { ScLink } from '@semantic-components/ui';
import { ScCopyButton, ScSeparator } from '@semantic-components/ui-lab';

import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-getting-started-page',
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
        <h1 class="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p class="text-muted-foreground">
          Install and configure Semantic Components in your Angular project.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          1. Install Angular Aria and CDK
        </h2>
        <p class="text-muted-foreground">
          Semantic Components depends on Angular Aria and Angular CDK.
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="step1Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step1Code" language="bash"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          2. Set up Tailwind CSS
        </h2>
        <p class="text-muted-foreground">
          Tailwind CSS v4 is required. Follow the official Angular guide to set
          it up:
        </p>
        <a
          sc-link
          variant="outline"
          href="https://tailwindcss.com/docs/installation/framework-guides/angular"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tailwind CSS - Angular Installation Guide
        </a>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          3. Install utilities
        </h2>
        <p class="text-muted-foreground">
          Install the required utility libraries for class management and
          animations.
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="step3Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step3Code" language="bash"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          4. Install Semantic Components
        </h2>
        <p class="text-muted-foreground">
          Install the UI library and icon set.
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="step4Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step4Code" language="bash"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          5. Configure styles
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
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>css</span>
            <button sc-copy-button [value]="stylesDefaultCode"></button>
          </div>
          <div
            sc-code-viewer-content
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
          sc-link
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
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>css</span>
            <button sc-copy-button [value]="stylesCustomCdkCode"></button>
          </div>
          <div
            sc-code-viewer-content
            [code]="stylesCustomCdkCode"
            language="css"
          ></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          6. Configure Tailwind source
        </h2>
        <p class="text-muted-foreground">
          Add the library as a Tailwind source so its classes are included in
          the build. Add this to your
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>css</span>
            <button sc-copy-button [value]="step6Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step6Code" language="css"></div>
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
export default class GettingStartedPage {
  readonly step1Code = 'npm install @angular/aria @angular/cdk';

  readonly step3Code =
    'npm install class-variance-authority clsx tailwind-merge tw-animate-css';

  readonly step4Code =
    'npm install @semantic-icons/lucide-icons @semantic-components/ui';

  readonly step6Code = '@source "../node_modules/@semantic-components/ui";';

  readonly stylesDefaultCode = '@import "@semantic-components/ui/styles";';

  readonly stylesCustomCdkCode =
    "@import url('@angular/cdk/overlay-prebuilt.css');";

  readonly usageCode = `import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-example',
  imports: [ScButton],
  template: \`
    <button sc-button>Click me</button>
  \`,
})
export class ExampleComponent {}`;
}
