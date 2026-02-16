import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-speed-marquee-demo',
  imports: [ScMarqueeText],
  template: `
    <div class="space-y-4">
      <div>
        <p class="text-sm text-muted-foreground mb-1">Fast (10s)</p>
        <scMarqueeText
          text="Fast scrolling text"
          [duration]="10"
          separator="→"
        />
      </div>
      <div>
        <p class="text-sm text-muted-foreground mb-1">Normal (20s)</p>
        <scMarqueeText
          text="Normal scrolling text"
          [duration]="20"
          separator="→"
        />
      </div>
      <div>
        <p class="text-sm text-muted-foreground mb-1">Slow (40s)</p>
        <scMarqueeText
          text="Slow scrolling text"
          [duration]="40"
          separator="→"
        />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedMarqueeDemo {}
