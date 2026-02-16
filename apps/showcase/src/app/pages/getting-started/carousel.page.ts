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
  selector: 'app-carousel-page',
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
        <h1 class="text-3xl font-bold tracking-tight">Carousel</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            &#64;semantic-components/carousel
          </code>
          package. Requires the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 toc class="text-xl font-semibold tracking-tight">
          1. Install the package
        </h2>
        <p class="text-muted-foreground">
          Install the carousel library and its peer dependency
          <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
            embla-carousel
          </code>
          .
        </p>
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
          Add the carousel library as a Tailwind source in your
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
          Import and use the carousel in your Angular templates:
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
export default class CarouselInstallPage {
  readonly installCode =
    'npm install @semantic-components/carousel embla-carousel';

  readonly sourceCode =
    '@source "../node_modules/@semantic-components/carousel";';

  readonly usageCode = `import {
  ScCarousel,
  ScCarouselViewport,
  ScCarouselTrack,
  ScCarouselItem,
  ScCarouselPrevious,
  ScCarouselNext,
} from '@semantic-components/carousel';

@Component({
  selector: 'app-example',
  imports: [
    ScCarousel,
    ScCarouselViewport,
    ScCarouselTrack,
    ScCarouselItem,
    ScCarouselPrevious,
    ScCarouselNext,
  ],
  template: \`
    <div sc-carousel>
      <div sc-carousel-viewport>
        <div sc-carousel-track>
          <div sc-carousel-item>Slide 1</div>
          <div sc-carousel-item>Slide 2</div>
          <div sc-carousel-item>Slide 3</div>
        </div>
      </div>
      <button sc-carousel-previous></button>
      <button sc-carousel-next></button>
    </div>
  \`,
})
export class ExampleComponent {}`;
}
