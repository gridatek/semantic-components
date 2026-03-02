import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';
import { SiMapPinIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-map-aspect-ratio-demo',
  imports: [ScAspectRatio, SiMapPinIcon],
  template: `
    <div class="w-[450px] overflow-hidden rounded-md border">
      <div scAspectRatio [ratio]="3 / 2" class="bg-muted">
        <div class="flex size-full items-center justify-center">
          <svg siMapPinIcon class="text-muted-foreground size-10"></svg>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapAspectRatioDemo {}
