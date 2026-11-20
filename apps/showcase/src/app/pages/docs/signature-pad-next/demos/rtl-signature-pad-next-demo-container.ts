import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSignaturePadNextDemo } from './rtl-signature-pad-next-demo';

@Component({
  selector: 'app-rtl-signature-pad-next-demo-container',
  imports: [DemoContainer, RtlSignaturePadNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/signature-pad-next/rtl-signature-pad-next-demo"
    >
      <app-rtl-signature-pad-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSignaturePadNextDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScButton, ScSignaturePadNext } from '@semantic-components/ui';

/** In a right-to-left page: the pad draws as anywhere (ink has no direction); your text and buttons follow the page. */
@Component({
  selector: 'app-rtl-signature-pad-next-demo',
  imports: [Dir, ScButton, ScSignaturePadNext],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-md space-y-2">
      <div scSignaturePadNext #pad="scSignaturePadNext" aria-label="التوقيع">
        <span
          class="text-muted-foreground pointer-events-none absolute start-3 bottom-3 text-sm"
        >
          وقّع هنا
        </span>
      </div>
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
export class RtlSignaturePadNextDemo {}`;
}
