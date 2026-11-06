import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlPopoverNextDemo } from './rtl-popover-next-demo';

@Component({
  selector: 'app-rtl-popover-next-demo-container',
  imports: [DemoContainer, RtlPopoverNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/popover-next/rtl-popover-next-demo"
      [code]="code"
    >
      <app-rtl-popover-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPopoverNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopoverNext,
  ScPopoverNextDescription,
  ScPopoverNextHeader,
  ScPopoverNextPortal,
  ScPopoverNextProvider,
  ScPopoverNextTitle,
  ScPopoverNextTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: start is the right; inline-start too. */
@Component({
  selector: 'app-rtl-popover-next-demo',
  imports: [
    ScButton,
    ScPopoverNext,
    ScPopoverNextDescription,
    ScPopoverNextHeader,
    ScPopoverNextPortal,
    ScPopoverNextProvider,
    ScPopoverNextTitle,
    ScPopoverNextTrigger,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scPopoverNextProvider align="start">
        <button scButton scPopoverNextTrigger variant="outline">افتح</button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext>
            <div scPopoverNextHeader>
              <h2 scPopoverNextTitle>الأبعاد</h2>
              <p scPopoverNextDescription>اضبط أبعاد الطبقة.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPopoverNextProvider side="inline-start">
        <button scButton scPopoverNextTrigger variant="outline">البداية</button>
        <ng-template scPopoverNextPortal>
          <div scPopoverNext class="w-40">على جانب البداية</div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPopoverNextDemo {}`;
}
