import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VideoAspectRatioDemo } from './video-aspect-ratio-demo';

@Component({
  selector: 'app-video-aspect-ratio-demo-container',
  imports: [DemoContainer, VideoAspectRatioDemo],
  template: `
    <app-demo-container
      title="Video"
      demoUrl="/demos/aspect-ratio/video-aspect-ratio-demo"
      [code]="code"
    >
      <app-video-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VideoAspectRatioDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** A video in a 16 / 9 frame, filling it. */
@Component({
  selector: 'app-video-aspect-ratio-demo',
  imports: [ScAspectRatio, ScFrame],
  template: \`
    <div
      scAspectRatio
      scFrame
      [ratio]="16 / 9"
      class="w-full max-w-md bg-black"
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VideoAspectRatioDemo {}`;
}
