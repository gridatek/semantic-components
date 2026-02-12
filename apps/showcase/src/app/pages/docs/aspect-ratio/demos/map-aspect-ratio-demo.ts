import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-map-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: `
    <div class="w-[450px] overflow-hidden rounded-md border">
      <div sc-aspect-ratio [ratio]="3 / 2" class="bg-muted">
        <div class="flex size-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-10 text-muted-foreground"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapAspectRatioDemo {}
