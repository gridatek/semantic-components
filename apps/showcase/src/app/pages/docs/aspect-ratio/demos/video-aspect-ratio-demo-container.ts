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
  host: { class: 'block w-full' },
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
import { SiPlayIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-video-aspect-ratio-demo',
  imports: [ScAspectRatio, SiPlayIcon],
  template: \`
    <div class="w-[450px] overflow-hidden rounded-md border">
      <div scAspectRatio [ratio]="16 / 9" class="bg-black">
        <div class="flex size-full items-center justify-center text-white">
          <svg siPlayIcon class="size-16 fill-current"></svg>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoAspectRatioDemo {}`;
}
