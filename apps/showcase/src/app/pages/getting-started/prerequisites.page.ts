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
  selector: 'app-prerequisites-page',
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
          4. Install icons
        </h2>
        <p class="text-muted-foreground">
          Install the icon library used by Semantic Components.
        </p>
        <div sc-code-viewer>
          <div sc-code-viewer-header>
            <span sc-code-viewer-label>terminal</span>
            <button sc-copy-button [value]="step4Code"></button>
          </div>
          <div sc-code-viewer-content [code]="step4Code" language="bash"></div>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrerequisitesPage {
  readonly step1Code = 'npm install @angular/aria @angular/cdk';

  readonly step3Code =
    'npm install class-variance-authority clsx tailwind-merge tw-animate-css';

  readonly step4Code = 'npm install @semantic-icons/lucide-icons';
}
