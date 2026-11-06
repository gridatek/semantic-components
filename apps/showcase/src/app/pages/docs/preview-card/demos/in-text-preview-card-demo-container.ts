import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InTextPreviewCardDemo } from './in-text-preview-card-demo';

@Component({
  selector: 'app-in-text-preview-card-demo-container',
  imports: [DemoContainer, InTextPreviewCardDemo],
  template: `
    <app-demo-container
      title="In text"
      demoUrl="/demos/preview-card/in-text-preview-card-demo"
      [code]="code"
    >
      <app-in-text-preview-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InTextPreviewCardDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

/** A link in a sentence, previewing its destination — what the card shows is on that page too. */
@Component({
  selector: 'app-in-text-preview-card-demo',
  imports: [
    NgOptimizedImage,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
  ],
  template: \`
    <div scPreviewCardProvider [offset]="8">
      <p class="text-base text-balance">
        The trail ends at a
        <a
          href="https://en.wikipedia.org/wiki/Waterfall"
          scPreviewCardTrigger
          class="decoration-foreground/60 hover:decoration-foreground data-popup-open:decoration-foreground focus-visible:outline-ring underline decoration-1 underline-offset-2 outline-0 focus-visible:no-underline focus-visible:outline-2"
        >
          waterfall</a
        >
        you can hear long before you see it.
      </p>
      <ng-template scPreviewCardPortal>
        <div scPreviewCard class="flex w-60 flex-col gap-2">
          <img
            ngSrc="/images/gallery/waterfall-thumb.jpg"
            width="224"
            height="150"
            priority
            alt="Water falling over a rock face into a pool"
            class="rounded-md"
          />
          <p>
            <strong>A waterfall</strong> is a point in a river or stream where
            water flows over a vertical drop or a series of steep drops.
          </p>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InTextPreviewCardDemo {}`;
}
