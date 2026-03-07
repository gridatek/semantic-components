import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlaceholderAspectRatioDemo } from './placeholder-aspect-ratio-demo';

@Component({
  selector: 'app-placeholder-aspect-ratio-demo-container',
  imports: [DemoContainer, PlaceholderAspectRatioDemo],
  template: `
    <app-demo-container
      title="With Placeholder Background"
      demoUrl="/demos/aspect-ratio/placeholder-aspect-ratio-demo"
      [code]="code"
    >
      <app-placeholder-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderAspectRatioDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';
import { SiImageIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-placeholder-aspect-ratio-demo',
  imports: [ScAspectRatio, SiImageIcon],
  template: \`
    <div class="w-[450px] overflow-hidden rounded-md">
      <div scAspectRatio [ratio]="16 / 9" class="bg-muted">
        <div class="flex size-full items-center justify-center">
          <svg siImageIcon class="text-muted-foreground size-10"></svg>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderAspectRatioDemo {}`;
}
