import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: inline-start is the right. */
@Component({
  selector: 'app-rtl-tooltip-demo',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scTooltipProvider side="inline-start">
        <button scButton scTooltipTrigger variant="outline">البداية</button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            إضافة إلى المكتبة
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider side="top">
        <button scButton scTooltipTrigger variant="outline">الأعلى</button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            إضافة إلى المكتبة
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
      <div scTooltipProvider side="inline-end">
        <button scButton scTooltipTrigger variant="outline">النهاية</button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            إضافة إلى المكتبة
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTooltipDemo {}
