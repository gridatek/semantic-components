import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextCheckboxItem,
  ScMenuNextContent,
  ScMenuNextGroup,
  ScMenuNextItem,
  ScMenuNextItemIndicator,
  ScMenuNextLabel,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextShortcut,
  ScMenuNextTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/**
 * Right to left: the menu takes its trigger's direction and language by
 * itself — no dir on the menu. Its submenu opens to the left, the arrows
 * mirrored.
 */
@Component({
  selector: 'app-rtl-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextCheckboxItem,
    ScMenuNextContent,
    ScMenuNextGroup,
    ScMenuNextItem,
    ScMenuNextItemIndicator,
    ScMenuNextLabel,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextShortcut,
    ScMenuNextTrigger,
    SiCheckIcon,
    SiChevronRightIcon,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex justify-center">
      <div scMenuNextProvider>
        <button scButton scMenuNextTrigger variant="outline">فتح</button>
        <ng-template scMenuNextPortal>
          <div scMenuNext class="w-48">
            <ng-template scMenuNextContent>
              <div scMenuNextGroup>
                <div scMenuNextLabel>حسابي</div>
                <div scMenuNextItem value="الملف الشخصي">
                  الملف الشخصي
                  <span scMenuNextShortcut>⇧⌘P</span>
                </div>
                <div scMenuNextItem value="الفواتير">الفواتير</div>
              </div>
              <div scMenuNextSeparator></div>
              <div scMenuNextCheckboxItem [(checked)]="statusBar">
                <span scMenuNextItemIndicator><svg siCheckIcon></svg></span>
                شريط الحالة
              </div>
              <div scMenuNextItem value="دعوة">
                دعوة مستخدمين
                <svg siChevronRightIcon></svg>
                <ng-template scMenuNextPortal>
                  <div scMenuNext>
                    <ng-template scMenuNextContent>
                      <div scMenuNextItem value="البريد">البريد</div>
                      <div scMenuNextItem value="رسالة">رسالة</div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
              <div scMenuNextSeparator></div>
              <div scMenuNextItem value="خروج" variant="destructive">
                تسجيل الخروج
              </div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMenuNextDemo {
  protected readonly statusBar = signal(true);
}
