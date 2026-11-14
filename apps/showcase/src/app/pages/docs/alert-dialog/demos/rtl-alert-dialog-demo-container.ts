import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAlertDialogDemo } from './rtl-alert-dialog-demo';

@Component({
  selector: 'app-rtl-alert-dialog-demo-container',
  imports: [DemoContainer, RtlAlertDialogDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/alert-dialog/rtl-alert-dialog-demo"
      [code]="code"
    >
      <app-rtl-alert-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAlertDialogDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScAlertDialog,
  ScAlertDialogAction,
  ScAlertDialogCancel,
  ScAlertDialogDescription,
  ScAlertDialogFooter,
  ScAlertDialogHeader,
  ScAlertDialogMedia,
  ScAlertDialogPortal,
  ScAlertDialogProvider,
  ScAlertDialogTitle,
  ScAlertDialogTrigger,
  ScButton,
} from '@semantic-components/ui';
import { SiCircleFadingPlusIcon } from '@semantic-icons/lucide-icons';

/**
 * Right to left: the dialog takes its direction from where it opens — the
 * text from the right, the media on the right, the buttons from the left.
 */
@Component({
  selector: 'app-rtl-alert-dialog-demo',
  imports: [
    Dir,
    ScAlertDialog,
    ScAlertDialogAction,
    ScAlertDialogCancel,
    ScAlertDialogDescription,
    ScAlertDialogFooter,
    ScAlertDialogHeader,
    ScAlertDialogMedia,
    ScAlertDialogPortal,
    ScAlertDialogProvider,
    ScAlertDialogTitle,
    ScAlertDialogTrigger,
    ScButton,
    SiCircleFadingPlusIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex justify-center">
      <div scAlertDialogProvider>
        <button scButton scAlertDialogTrigger variant="outline">
          مشاركة المشروع
        </button>
        <ng-template scAlertDialogPortal>
          <div scAlertDialog dir="rtl" lang="ar">
            <div scAlertDialogHeader>
              <div scAlertDialogMedia>
                <svg siCircleFadingPlusIcon></svg>
              </div>
              <h2 scAlertDialogTitle>مشاركة هذا المشروع؟</h2>
              <p scAlertDialogDescription>
                سيتمكن أي شخص لديه الرابط من عرض هذا المشروع وتعديله.
              </p>
            </div>
            <div scAlertDialogFooter>
              <button scAlertDialogCancel>إلغاء</button>
              <button scAlertDialogAction>مشاركة</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAlertDialogDemo {}`;
}
