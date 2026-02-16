import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VideoAspectRatioDemo } from './video-aspect-ratio-demo';

@Component({
  selector: 'app-video-aspect-ratio-demo-container',
  imports: [DemoContainer, VideoAspectRatioDemo],
  template: `
    <app-demo-container
      title="Video Embed Container"
      demoUrl="/demos/aspect-ratio/video-aspect-ratio-demo"
      [code]="code"
    >
      <app-video-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoAspectRatioDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

@Component({
  selector: 'app-video-aspect-ratio-demo',
  imports: [ScAspectRatio],
  template: \`
    <div class="w-[450px] overflow-hidden rounded-md border">
      <div sc-aspect-ratio [ratio]="16 / 9" class="bg-black">
        <div class="flex size-full items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-16"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoAspectRatioDemo {}`;
}
