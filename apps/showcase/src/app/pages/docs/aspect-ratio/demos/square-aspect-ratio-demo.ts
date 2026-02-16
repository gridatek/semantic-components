import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

@Component({
  selector: 'app-square-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: `
    <div class="w-[300px] overflow-hidden rounded-md">
      <div sc-aspect-ratio [ratio]="1">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="size-full object-cover"
        />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareAspectRatioDemo {}
