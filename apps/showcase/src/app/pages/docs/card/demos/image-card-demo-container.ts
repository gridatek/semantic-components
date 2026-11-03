import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ImageCardDemo } from './image-card-demo';

@Component({
  selector: 'app-image-card-demo-container',
  imports: [DemoContainer, ImageCardDemo],
  template: `
    <app-demo-container
      title="Image"
      demoUrl="/demos/card/image-card-demo"
      [code]="code"
    >
      <app-image-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageCardDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScButton,
  ScCard,
  ScCardAction,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
} from '@semantic-components/ui';

/** An image before the header: no padding above it, the card's corners. */
@Component({
  selector: 'app-image-card-demo',
  imports: [
    NgOptimizedImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
  ],
  template: \`
    <div scCard class="w-full max-w-sm">
      <img
        ngSrc="/images/gallery/mountains.jpg"
        width="1600"
        height="1067"
        alt="Mountains at dawn"
        class="aspect-video w-full object-cover"
      />
      <div scCardHeader>
        <h4 scCardTitle>Design systems meetup</h4>
        <p scCardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </p>
        <div scCardAction>
          <span scBadge variant="secondary">Featured</span>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">View Event</button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ImageCardDemo {}`;
}
