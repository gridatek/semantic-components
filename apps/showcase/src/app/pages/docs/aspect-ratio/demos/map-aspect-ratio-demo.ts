import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SiMapPinIcon } from '@semantic-icons/lucide-icons';
import { ScAspectRatio } from '@semantic-components/ui';

@Component({
  selector: 'app-map-aspect-ratio-demo',
  imports: [ScAspectRatio, SiMapPinIcon],
  template: `
    <div class="w-[450px] overflow-hidden rounded-md border">
      <div scAspectRatio [ratio]="3 / 2" class="bg-muted">
        <div class="flex size-full items-center justify-center">
          <svg si-map-pin-icon class="size-10 text-muted-foreground"></svg>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapAspectRatioDemo {}
