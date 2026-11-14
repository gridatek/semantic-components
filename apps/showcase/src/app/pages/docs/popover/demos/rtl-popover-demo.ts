import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPopover,
  ScPopoverDescription,
  ScPopoverHeader,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTitle,
  ScPopoverTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: start is the right; inline-start too. */
@Component({
  selector: 'app-rtl-popover-demo',
  imports: [
    Dir,
    ScButton,
    ScPopover,
    ScPopoverDescription,
    ScPopoverHeader,
    ScPopoverPortal,
    ScPopoverProvider,
    ScPopoverTitle,
    ScPopoverTrigger,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex flex-wrap gap-2">
      <div scPopoverProvider alignment="start">
        <button scButton scPopoverTrigger variant="outline">افتح</button>
        <ng-template scPopoverPortal>
          <div scPopover>
            <div scPopoverHeader>
              <h2 scPopoverTitle>الأبعاد</h2>
              <p scPopoverDescription>اضبط أبعاد الطبقة.</p>
            </div>
          </div>
        </ng-template>
      </div>
      <div scPopoverProvider side="inline-start">
        <button scButton scPopoverTrigger variant="outline">البداية</button>
        <ng-template scPopoverPortal>
          <div scPopover class="w-40">على جانب البداية</div>
        </ng-template>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPopoverDemo {}
