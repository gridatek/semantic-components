import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMenuDemo } from './rtl-menu-demo';

@Component({
  selector: 'app-rtl-menu-demo-container',
  imports: [DemoContainer, RtlMenuDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/menu/rtl-menu-demo"
      [code]="code"
    >
      <app-rtl-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMenuDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuSubmenuIcon,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/**
 * Right to left: the menu takes its trigger's direction and language by
 * itself — no dir on the menu. Its submenu opens to the left, the arrows
 * mirrored.
 */
@Component({
  selector: 'app-rtl-menu-demo',
  imports: [
    Dir,
    ScButton,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuSubmenuIcon,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuShortcut,
    ScMenuTrigger,
    SiCheckIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex justify-center">
      <div scMenuProvider>
        <button scButton scMenuTrigger variant="outline">فتح</button>
        <ng-template scMenuPortal>
          <div scMenu class="w-48">
            <ng-template scMenuContent>
              <div scMenuGroup>
                <div scMenuLabel>حسابي</div>
                <div scMenuItem value="الملف الشخصي">
                  الملف الشخصي
                  <span scMenuShortcut>⇧⌘P</span>
                </div>
                <div scMenuItem value="الفواتير">الفواتير</div>
              </div>
              <div scMenuSeparator></div>
              <div scMenuCheckboxItem [(checked)]="statusBar">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                شريط الحالة
              </div>
              <div scMenuItem value="دعوة">
                دعوة مستخدمين
                <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                <ng-template scMenuPortal>
                  <div scMenu>
                    <ng-template scMenuContent>
                      <div scMenuItem value="البريد">البريد</div>
                      <div scMenuItem value="رسالة">رسالة</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuSeparator></div>
              <div scMenuItem value="خروج" variant="destructive">
                تسجيل الخروج
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
export class RtlMenuDemo {
  protected readonly statusBar = signal(true);
}`;
}
