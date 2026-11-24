import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlNativeDialogDemo } from './rtl-native-dialog-demo';

@Component({
  selector: 'app-rtl-native-dialog-demo-container',
  imports: [DemoContainer, RtlNativeDialogDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/native-dialog/rtl-native-dialog-demo"
      [code]="code"
    >
      <app-rtl-native-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNativeDialogDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScNativeDialog,
  ScNativeDialogClose,
  ScNativeDialogDescription,
  ScNativeDialogFooter,
  ScNativeDialogHeader,
  ScNativeDialogPortal,
  ScNativeDialogProvider,
  ScNativeDialogTitle,
  ScNativeDialogTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the dialog takes the direction and language of where it is opened — no dir on it; its ✕ on the left. */
@Component({
  selector: 'app-rtl-native-dialog-demo',
  imports: [
    Dir,
    ScButton,
    ScNativeDialogProvider,
    ScNativeDialogTrigger,
    ScNativeDialogPortal,
    ScNativeDialog,
    ScNativeDialogClose,
    ScNativeDialogHeader,
    ScNativeDialogTitle,
    ScNativeDialogDescription,
    ScNativeDialogFooter,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScInput,
    ScSelectOnFocus,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scNativeDialogProvider [(open)]="open">
        <button scButton variant="outline" scNativeDialogTrigger>فتح الحوار</button>
        <ng-template scNativeDialogPortal>
          <dialog scNativeDialog class="sm:max-w-sm">
            <button scNativeDialogClose>
              <svg siXIcon></svg>
              <span class="sr-only">إغلاق</span>
            </button>
            <div scNativeDialogHeader>
              <h2 scNativeDialogTitle>تعديل الملف الشخصي</h2>
              <p scNativeDialogDescription>
                قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند
                الانتهاء.
              </p>
            </div>
            <div scFieldGroup>
              <div scField>
                <label scLabel>الاسم</label>
                <input
                  autofocus
                  scSelectOnFocus="program"
                  scInput
                  value="Pedro Duarte"
                />
              </div>
              <div scField>
                <label scLabel>اسم المستخدم</label>
                <input scInput value="@peduarte" />
              </div>
            </div>
            <div scNativeDialogFooter>
              <button scNativeDialogClose variant="outline" size="default">
                إلغاء
              </button>
              <button scButton (click)="save()">حفظ التغييرات</button>
            </div>
          </dialog>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNativeDialogDemo {
  private readonly open = signal(false);

  /** Save: your code runs first; the dialog closes when it's done. */
  private save(): void {
    // Send the changes, check them…
    this.open.set(false);
  }
}`;
}
