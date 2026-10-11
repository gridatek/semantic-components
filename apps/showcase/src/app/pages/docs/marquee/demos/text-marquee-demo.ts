import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScMarqueeText,
  ScMarqueeTextSegment,
  ScMarqueeTextSeparator,
  ScMarqueeTextTrack,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-text-marquee-demo',
  imports: [
    ScButton,
    ScMarqueeText,
    ScMarqueeTextTrack,
    ScMarqueeTextSegment,
    ScMarqueeTextSeparator,
  ],
  template: `
    <div class="mb-2 flex justify-end">
      <button
        scButton
        variant="outline"
        size="sm"
        [attr.aria-pressed]="paused()"
        (click)="paused.set(!paused())"
      >
        {{ paused() ? 'Play' : 'Pause' }}
      </button>
    </div>
    <div class="bg-muted/30 rounded-lg border py-2">
      <div scMarqueeText [duration]="15" [paused]="paused()">
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
  readonly paused = signal(false);
  readonly repeats = [1, 2, 3, 4];
}
