import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMarqueeText } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-pause-on-hover-marquee-demo',
  imports: [ScMarqueeText],
  template: `
    <p class="text-muted-foreground mb-3 text-sm">
      Hover over the marquee to pause animation
    </p>
    <div class="bg-primary/5 rounded-lg border py-3">
      <div
        scMarqueeText
        text="Hover over me to pause the animation!"
        [duration]="15"
        [pauseOnHover]="true"
      ></div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseOnHoverMarqueeDemo {}
