import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSignaturePadDemo } from './rtl-signature-pad-demo';

@Component({
  selector: 'app-rtl-signature-pad-demo-container',
  imports: [DemoContainer, RtlSignaturePadDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/signature-pad/rtl-signature-pad-demo"
    >
      <app-rtl-signature-pad-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSignaturePadDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSignaturePad } from '@semantic-components/ui';

/** In a right-to-left page: the pad draws as anywhere (ink has no direction); your hint and buttons follow the page. */
@Component({
  selector: 'app-rtl-signature-pad-demo',
  imports: [Dir, ScButton, ScSignaturePad],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-md space-y-2">
      <p id="rtl-signature-hint" class="text-muted-foreground text-sm">
        وقّع في المربع أدناه
      </p>
      <div
        scSignaturePad
        #pad="scSignaturePad"
        aria-label="التوقيع"
        aria-describedby="rtl-signature-hint"
      ></div>
      <div class="flex justify-end gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="!pad.canUndo()"
          (click)="pad.undo()"
        >
          تراجع
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          [disabled]="pad.empty()"
          (click)="pad.clear()"
        >
          مسح
        </button>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSignaturePadDemo {}`;
}
