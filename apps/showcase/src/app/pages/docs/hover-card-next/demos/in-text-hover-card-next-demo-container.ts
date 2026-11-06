import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InTextHoverCardNextDemo } from './in-text-hover-card-next-demo';

@Component({
  selector: 'app-in-text-hover-card-next-demo-container',
  imports: [DemoContainer, InTextHoverCardNextDemo],
  template: `
    <app-demo-container
      title="In text"
      demoUrl="/demos/hover-card-next/in-text-hover-card-next-demo"
      [code]="code"
    >
      <app-in-text-hover-card-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InTextHoverCardNextDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHoverCardNext,
  ScHoverCardNextPortal,
  ScHoverCardNextProvider,
  ScHoverCardNextTrigger,
} from '@semantic-components/ui';

/** A link in a sentence, previewing its destination — what the card shows is on that page too. */
@Component({
  selector: 'app-in-text-hover-card-next-demo',
  imports: [
    NgOptimizedImage,
    ScHoverCardNext,
    ScHoverCardNextPortal,
    ScHoverCardNextProvider,
    ScHoverCardNextTrigger,
  ],
  template: \`
    <div scHoverCardNextProvider [offset]="8">
      <p class="text-base text-balance">
        The trail ends at a
        <a
          href="https://en.wikipedia.org/wiki/Waterfall"
          scHoverCardNextTrigger
          class="decoration-foreground/60 hover:decoration-foreground data-popup-open:decoration-foreground focus-visible:outline-ring underline decoration-1 underline-offset-2 outline-0 focus-visible:no-underline focus-visible:outline-2"
        >
          waterfall</a
        >
        you can hear long before you see it.
      </p>
      <ng-template scHoverCardNextPortal>
        <div scHoverCardNext class="flex w-60 flex-col gap-2">
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
export class InTextHoverCardNextDemo {}`;
}
