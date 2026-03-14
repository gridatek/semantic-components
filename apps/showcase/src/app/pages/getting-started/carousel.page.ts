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
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { ScSeparator } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { PackageManagerInstall } from '../../components/package-manager-install/package-manager-install';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-carousel-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    ScSeparator,
    ScHeading,
    PackageManagerInstall,
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
        <h2 scHeading appToc>1. Install the package</h2>
        <p class="text-muted-foreground">
          Install the carousel library and its peer dependency
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            embla-carousel
          </code>
          .
        </p>
        <app-package-manager-install
          packages="@semantic-components/carousel embla-carousel"
        />
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>2. Configure Tailwind source</h2>
        <p class="text-muted-foreground">
          Add the carousel library as a Tailwind source in your
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">styles.css</code>
          :
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>css</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="sourceCode"
              #copy2="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy2.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div scCodeViewerContent [code]="sourceCode" language="css"></div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <p class="text-muted-foreground">
          Import and use the carousel in your Angular templates:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>angular-ts</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="usageCode"
              #copy3="scCopyToClipboard"
              aria-label="Copy to clipboard"
            >
              @if (copy3.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CarouselInstallPage {
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
