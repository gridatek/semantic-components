import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardSkeletonDemo } from './card-skeleton-demo';

@Component({
  selector: 'app-card-skeleton-demo-container',
  imports: [DemoContainer, CardSkeletonDemo],
  template: `
    <app-demo-container
      title="Card"
      demoUrl="/demos/skeleton/card-skeleton-demo"
      [code]="code"
    >
      <app-card-skeleton-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class CardSkeletonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScSkeleton,
} from '@semantic-components/ui';

/** A card while its content loads: in the card’s own parts. */
@Component({
  selector: 'app-card-skeleton-demo',
  imports: [ScCard, ScCardBody, ScCardHeader, ScSkeleton],
  template: \`
    <div scCard class="w-full max-w-xs">
      <div scCardHeader>
        <div scSkeleton class="h-4 w-2/3"></div>
        <div scSkeleton class="h-4 w-1/2"></div>
      </div>
      <div scCardBody>
        <div scSkeleton class="aspect-video w-full"></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CardSkeletonDemo {}`;
}
