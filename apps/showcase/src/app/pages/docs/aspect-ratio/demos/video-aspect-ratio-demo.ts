import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

/** A video in a 16 / 9 frame, filling it. */
@Component({
  selector: 'app-video-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: `
    <div
      scAspectRatio
      [ratio]="16 / 9"
      class="w-full max-w-md overflow-hidden rounded-lg bg-black"
    >
      <video
        controls
        preload="none"
        poster="/media/sintel-trailer.jpg"
        class="size-full"
        aria-label="Sintel, trailer"
      >
        <source src="/media/sintel-trailer.mp4" type="video/mp4" />
      </video>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VideoAspectRatioDemo {}
