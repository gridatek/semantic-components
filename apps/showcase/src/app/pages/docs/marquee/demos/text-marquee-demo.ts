import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScMarqueeText,
  ScMarqueeTextSegment,
  ScMarqueeTextSeparator,
  ScMarqueeTextTrack,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-text-marquee-demo',
  imports: [
    ScMarqueeText,
    ScMarqueeTextTrack,
    ScMarqueeTextSegment,
    ScMarqueeTextSeparator,
  ],
  template: `
    <div class="bg-muted/30 rounded-lg border py-2">
      <div scMarqueeText [duration]="15">
        <div scMarqueeTextTrack>
          @for (_ of repeats; track $index) {
            <span scMarqueeTextSegment>
              Breaking News: This is a scrolling text marquee component for
              Angular
            </span>
            <span scMarqueeTextSeparator>•</span>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TextMarqueeDemo {
  readonly repeats = [1, 2, 3, 4];
}
