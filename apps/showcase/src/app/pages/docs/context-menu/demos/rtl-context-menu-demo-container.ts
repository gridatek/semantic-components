import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlContextMenuDemo } from './rtl-context-menu-demo';

@Component({
  selector: 'app-rtl-context-menu-demo-container',
  imports: [DemoContainer, RtlContextMenuDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/context-menu/rtl-context-menu-demo"
      [code]="code"
    >
      <app-rtl-context-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlContextMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuSubmenuIcon,
} from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
  SiCheckIcon,
  SiChevronRightIcon,
  SiRotateCwIcon,
} from '@semantic-icons/lucide-icons';

/** Right to left: the menu opens toward the left of the pointer, its submenus too, the arrows mirrored. Only the area is marked right to left; the menu takes it from there. */
@Component({
  selector: 'app-rtl-context-menu-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScMenuSubmenuIcon,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
    ScMenuShortcut,
    SiArrowLeftIcon,
    SiArrowRightIcon,
    SiCheckIcon,
    SiChevronRightIcon,
    SiRotateCwIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scContextMenuProvider class="w-full max-w-xs">
        <div
          scContextMenuTrigger
          class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
        >
          <span class="hidden pointer-fine:inline-block"
            >انقر بزر الماوس الأيمن هنا</span
          >
          <span class="hidden pointer-coarse:inline-block"
            >اضغط مطولاً هنا</span
          >
        </div>
        <ng-template scMenuPortal>
          <div scMenu class="w-48">
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuItem value="التنقل">
                  التنقل
                  <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                  <ng-template scMenuPortal>
                    <div scMenu class="w-44">
                      <ng-template scMenuContent>
                        <div scMenuGroup>
                          <div scMenuItem value="رجوع">
                            <svg siArrowLeftIcon></svg>
                            رجوع
                            <span scMenuShortcut>⌘[</span>
                          </div>
                          <div scMenuItem value="تقدم" [disabled]="true">
                            <svg siArrowRightIcon></svg>
                            تقدم
                            <span scMenuShortcut>⌘]</span>
                          </div>
                          <div scMenuItem value="إعادة تحميل">
                            <svg siRotateCwIcon></svg>
                            إعادة تحميل
                            <span scMenuShortcut>⌘R</span>
                          </div>
                        </div>
                      </ng-template>
                    </div>
                  </ng-template>
                </div>
                <div scMenuItem value="المزيد من الأدوات">
                  المزيد من الأدوات
                  <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                  <ng-template scMenuPortal>
                    <div scMenu class="w-44">
                      <ng-template scMenuContent>
                        <div scMenuGroup>
                          <div scMenuItem value="حفظ الصفحة...">
                            حفظ الصفحة...
                          </div>
                          <div scMenuItem value="إنشاء اختصار...">
                            إنشاء اختصار...
                          </div>
                          <div scMenuItem value="تسمية النافذة...">
                            تسمية النافذة...
                          </div>
                        </div>
                        <div scMenuSeparator></div>
                        <div scMenuGroup>
                          <div scMenuItem value="أدوات المطور">
                            أدوات المطور
                          </div>
                        </div>
                        <div scMenuSeparator></div>
                        <div scMenuGroup>
                          <div scMenuItem value="حذف" variant="destructive">
                            حذف
                          </div>
                        </div>
                      </ng-template>
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuCheckboxItem [(checked)]="bookmarks">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  إظهار الإشارات المرجعية
                </div>
                <div scMenuCheckboxItem [(checked)]="fullUrls">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  إظهار عناوين URL الكاملة
                </div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuGroup>
                <div scMenuRadioGroup [(value)]="person">
                  <div scMenuLabel>الأشخاص</div>
                  <div scMenuRadioItem value="pedro">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    Pedro Duarte
                  </div>
                  <div scMenuRadioItem value="colm">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    Colm Tuite
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlContextMenuDemo {
  protected readonly bookmarks = signal(true);
  protected readonly fullUrls = signal(false);
  protected readonly person = signal('pedro');
}`;
}
