import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconsRatingNextDemo } from './icons-rating-next-demo';

@Component({
  selector: 'app-icons-rating-next-demo-container',
  imports: [DemoContainer, IconsRatingNextDemo],
  template: `
    <app-demo-container
      title="Other icons"
      demoUrl="/demos/rating-next/icons-rating-next-demo"
      [code]="code"
    >
      <app-icons-rating-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsRatingNextDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScRatingNext, ScRatingNextIcon } from '@semantic-components/ui';
import { SiHeartIcon } from '@semantic-icons/lucide-icons';

/** Any icon, and a colour of yours on the rating (the full stars). */
@Component({
  selector: 'app-icons-rating-next-demo',
  imports: [ScRatingNext, ScRatingNextIcon, SiHeartIcon],
  template: \`
    <div
      scRatingNext
      class="text-red-500"
      [(value)]="score"
      aria-label="How much you liked it"
      valueText="{value} of {max} hearts"
    >
      <ng-template scRatingNextIcon>
        <svg siHeartIcon></svg>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconsRatingNextDemo {
  private readonly score = signal<number | null>(4);
}`;
}
