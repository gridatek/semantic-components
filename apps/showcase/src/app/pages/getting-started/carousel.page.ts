import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
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
import { ScSeparator } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCopyIcon } from '@semantic-icons/lucide-icons';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-carousel-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    CdkCopyToClipboard,
    SiCopyIcon,
    ScSeparator,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Carousel</h1>
        <p class="text-muted-foreground">
          Install and configure the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            &#64;semantic-components/carousel
          </code>
          package. Requires the ui library to be installed first.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>1. Install the package</h2>
        <p class="text-muted-foreground">
          Install the carousel library and its peer dependency
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            embla-carousel
          </code>
          .
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>terminal</span>
            <button
              type="button"
              [cdkCopyToClipboard]="installCode"
              class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md"
              aria-label="Copy to clipboard"
            >
              <svg siCopyIcon class="size-4"></svg>
            </button>
          </div>
          <div scCodeViewerContent [code]="installCode" language="bash"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading toc>2. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the carousel library as a Tailwind source in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              type="button"
              [cdkCopyToClipboard]="sourceCode"
              class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md"
              aria-label="Copy to clipboard"
            >
              <svg siCopyIcon class="size-4"></svg>
            </button>
          </div>
          <div scCodeViewerContent [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading toc>Usage</h2>
        <p class="text-muted-foreground">
          Import and use the carousel in your Angular templates:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button
              type="button"
              [cdkCopyToClipboard]="usageCode"
              class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md"
              aria-label="Copy to clipboard"
            >
              <svg siCopyIcon class="size-4"></svg>
            </button>
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
    <div scCarousel>
      <div scCarouselViewport>
        <div scCarouselTrack>
          <div scCarouselItem>Slide 1</div>
          <div scCarouselItem>Slide 2</div>
          <div scCarouselItem>Slide 3</div>
        </div>
      </div>
      <button scCarouselPrevious></button>
      <button scCarouselNext></button>
    </div>
  \`,
})
export class ExampleComponent {}`;
}
