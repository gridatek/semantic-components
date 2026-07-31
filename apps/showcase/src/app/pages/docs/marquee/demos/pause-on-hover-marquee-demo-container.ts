import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PauseOnHoverMarqueeDemo } from './pause-on-hover-marquee-demo';

@Component({
  selector: 'app-pause-on-hover-marquee-demo-container',
  imports: [DemoContainer, PauseOnHoverMarqueeDemo],
  template: `
    <app-demo-container title="Pause on Hover" [code]="code">
      <app-pause-on-hover-marquee-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PauseOnHoverMarqueeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarqueeText,
  ScMarqueeTextSegment,
  ScMarqueeTextSeparator,
  ScMarqueeTextTrack,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-pause-on-hover-marquee-demo',
  imports: [
    ScMarqueeText,
    ScMarqueeTextTrack,
    ScMarqueeTextSegment,
    ScMarqueeTextSeparator,
  ],
  template: \`
    <p class="text-muted-foreground mb-3 text-sm">
      Hover over the marquee to pause animation
    </p>
    <div class="bg-primary/5 rounded-lg border py-3">
      <div scMarqueeText [duration]="15" [pauseOnHover]="true">
        <div scMarqueeTextTrack>
          @for (_ of repeats; track $index) {
            <span scMarqueeTextSegment>
              Hover over me to pause the animation!
            </span>
            <span scMarqueeTextSeparator>•</span>
          }
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PauseOnHoverMarqueeDemo {
  readonly repeats = [1, 2, 3, 4];
}`;
}
