import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlButtonGroupDemo } from './rtl-button-group-demo';

@Component({
  selector: 'app-rtl-button-group-demo-container',
  imports: [DemoContainer, RtlButtonGroupDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/button-group/rtl-button-group-demo"
      [code]="code"
    >
      <app-rtl-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiArchiveIcon,
  SiArrowLeftIcon,
  SiCalendarPlusIcon,
  SiClockIcon,
  SiEllipsisIcon,
  SiMailCheckIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-button-group-demo',
  imports: [
    ScButton,
    ScButtonGroup,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    SiArchiveIcon,
    SiArrowLeftIcon,
    SiCalendarPlusIcon,
    SiClockIcon,
    SiEllipsisIcon,
    SiMailCheckIcon,
    SiTrash2Icon,
  ],
  template: \`
    <div dir="rtl" lang="ar" scMenuProvider align="start">
      <div scButtonGroup aria-label="الرسالة">
        <div scButtonGroup class="hidden sm:flex">
          <button scButton variant="outline" size="icon">
            <svg siArrowLeftIcon class="rtl:rotate-180"></svg>
            <span class="sr-only">رجوع</span>
          </button>
        </div>
        <div scButtonGroup>
          <button scButton variant="outline">أرشفة</button>
          <button scButton variant="outline">إبلاغ</button>
        </div>
        <div scButtonGroup>
          <button scButton variant="outline">تأجيل</button>
          <button scButton scMenuTrigger variant="outline" size="icon">
            <svg siEllipsisIcon></svg>
            <span class="sr-only">خيارات أخرى</span>
          </button>
        </div>
      </div>
      <ng-template scMenuPortal>
        <div scMenu dir="rtl" lang="ar" class="w-44">
          <ng-template scMenuContent>
            <div scMenuItem value="تعليم كمقروء">
              <svg siMailCheckIcon></svg>
              تعليم كمقروء
            </div>
            <div scMenuItem value="أرشفة">
              <svg siArchiveIcon></svg>
              أرشفة
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="تأجيل">
              <svg siClockIcon></svg>
              تأجيل
            </div>
            <div scMenuItem value="إضافة إلى التقويم">
              <svg siCalendarPlusIcon></svg>
              إضافة إلى التقويم
            </div>
            <div scMenuSeparator></div>
            <div
              scMenuItem
              value="حذف"
              class="text-destructive data-[active=true]:bg-destructive/10 hover:bg-destructive/10"
            >
              <svg siTrash2Icon></svg>
              حذف
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlButtonGroupDemo {}`;
}
