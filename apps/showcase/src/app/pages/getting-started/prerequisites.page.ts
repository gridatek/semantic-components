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
  selector: 'app-prerequisites-page',
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
        <h1 class="text-3xl font-bold tracking-tight">Prerequisites</h1>
        <p class="text-muted-foreground">
          Common dependencies required by all Semantic Components packages.
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
          Tailwind CSS v4 is required. Follow these steps if not already
          installed:
        </p>

        <div class="space-y-4 pl-4">
          <div class="space-y-3">
            <h3 class="text-lg font-medium tracking-tight">
              2.1 Install Tailwind CSS
            </h3>
            <p class="text-muted-foreground">
              Next, open a terminal in your Angular project's root directory and
              run the following command to install Tailwind CSS and its peer
              dependencies:
            </p>
            <div sc-code-viewer>
              <div sc-code-viewer-header>
                <span sc-code-viewer-label>terminal</span>
                <button sc-copy-button [value]="step2Code"></button>
              </div>
              <div
                sc-code-viewer-content
                [code]="step2Code"
                language="bash"
              ></div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-lg font-medium tracking-tight">
              2.2 Configure PostCSS Plugins
            </h3>
            <p class="text-muted-foreground">
              Next, add a
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">
                .postcssrc.json
              </code>
              file in the file root of the project. Add the
              <code class="text-sm bg-muted px-1.5 py-0.5 rounded">
                &#64;tailwindcss/postcss
              </code>
              plugin into your PostCSS configuration.
            </p>
            <div sc-code-viewer>
              <div sc-code-viewer-header>
                <span sc-code-viewer-label>.postcssrc.json</span>
                <button sc-copy-button [value]="step3aCode"></button>
              </div>
              <div
                sc-code-viewer-content
                [code]="step3aCode"
                language="json"
              ></div>
            </div>
          </div>
        </div>
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
            <button sc-copy-button [value]="step4Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step4Code" language="bash"></div>
        </div>
      </section>

      <div sc-separator></div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          4. Install icons
        </h2>
        <p class="text-muted-foreground">
          Install the icon library used by Semantic Components.
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="step5Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step5Code" language="bash"></div>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrerequisitesPage {
  readonly step1Code = 'npm install @angular/aria @angular/cdk';

  readonly step2Code = 'npm install tailwindcss @tailwindcss/postcss postcss';

  readonly step3aCode = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;

  readonly step4Code =
    'npm install class-variance-authority clsx tailwind-merge tw-animate-css';

  readonly step5Code = 'npm install @semantic-icons/lucide-icons';
}
