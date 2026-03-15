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
    <div class="w-full space-y-4">
      <div>
        <p class="text-muted-foreground mb-1 text-sm">Fast (10s)</p>
        <div
          scMarqueeText
          text="Fast scrolling text"
          [duration]="10"
          separator="→"
        ></div>
      </div>
      <div>
        <p class="text-muted-foreground mb-1 text-sm">Normal (20s)</p>
        <div
          scMarqueeText
          text="Normal scrolling text"
          [duration]="20"
          separator="→"
        ></div>
      </div>
      <div>
        <p class="text-muted-foreground mb-1 text-sm">Slow (40s)</p>
        <div
          scMarqueeText
          text="Slow scrolling text"
          [duration]="40"
          separator="→"
        ></div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedMarqueeDemo {}
