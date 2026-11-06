import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTooltipNextDemo } from './rtl-tooltip-next-demo';

@Component({
  selector: 'app-rtl-tooltip-next-demo-container',
  imports: [DemoContainer, RtlTooltipNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/tooltip-next/rtl-tooltip-next-demo"
      [code]="code"
    >
      <app-rtl-tooltip-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTooltipNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltipNext,
  ScTooltipNextArrow,
  ScTooltipNextPortal,
  ScTooltipNextProvider,
  ScTooltipNextTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: inline-start is the right. */
@Component({
  selector: 'app-rtl-tooltip-next-demo',
  imports: [
    ScButton,
    ScTooltipNext,
    ScTooltipNextArrow,
    ScTooltipNextPortal,
    ScTooltipNextProvider,
    ScTooltipNextTrigger,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scTooltipNextProvider side="inline-start">
        <button scButton scTooltipNextTrigger variant="outline">البداية</button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            إضافة إلى المكتبة
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider side="top">
        <button scButton scTooltipNextTrigger variant="outline">الأعلى</button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            إضافة إلى المكتبة
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipNextProvider side="inline-end">
        <button scButton scTooltipNextTrigger variant="outline">النهاية</button>
        <ng-template scTooltipNextPortal>
          <div scTooltipNext>
            إضافة إلى المكتبة
            <span scTooltipNextArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTooltipNextDemo {}`;
}
