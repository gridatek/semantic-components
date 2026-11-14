import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlDialogDemo } from './rtl-dialog-demo';

@Component({
  selector: 'app-rtl-dialog-demo-container',
  imports: [DemoContainer, RtlDialogDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/dialog/rtl-dialog-demo"
      [code]="code"
    >
      <app-rtl-dialog-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlDialogDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelectOnFocus,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Right to left: the dialog takes the direction and language of where it is opened — no dir on it; its ✕ on the left. */
@Component({
  selector: 'app-rtl-dialog-demo',
  imports: [
    Dir,
    ScButton,
    ScDialogProvider,
    ScDialogTrigger,
    ScDialogPortal,
    ScDialog,
    ScDialogClose,
    ScDialogHeader,
    ScDialogTitle,
    ScDialogDescription,
    ScDialogFooter,
    ScFieldGroup,
    ScField,
    ScLabel,
    ScInput,
    ScSelectOnFocus,
    SiXIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scDialogProvider [(open)]="open">
        <button scButton variant="outline" scDialogTrigger>فتح الحوار</button>
        <ng-template scDialogPortal>
          <div scDialog class="sm:max-w-sm">
            <button scDialogClose>
              <svg siXIcon></svg>
              <span class="sr-only">إغلاق</span>
            </button>
            <div scDialogHeader>
              <h2 scDialogTitle>تعديل الملف الشخصي</h2>
              <p scDialogDescription>
                قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند
                الانتهاء.
              </p>
            </div>
            <div scFieldGroup>
              <div scField>
                <label scLabel>الاسم</label>
                <input
                  cdkFocusInitial
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
            <div scDialogFooter>
              <button scDialogClose variant="outline" size="default">
                إلغاء
              </button>
              <button scButton (click)="save()">حفظ التغييرات</button>
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
export class RtlDialogDemo {
  protected readonly open = signal(false);

  /** Save: your code runs first; the dialog closes when it's done. */
  protected save(): void {
    // Send the changes, check them…
    this.open.set(false);
  }
}`;
}
