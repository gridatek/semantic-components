import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlMenubarDemo } from './rtl-menubar-demo';

@Component({
  selector: 'app-rtl-menubar-demo-container',
  imports: [DemoContainer, RtlMenubarDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/menubar/rtl-menubar-demo"
      [code]="code"
    >
      <app-rtl-menubar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMenubarDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuPortal,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
  ScMenuShortcut,
  ScMenuSubmenuIcon,
  ScMenubar,
  ScMenubarItem,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/**
 * Right to left: the bar from the right, each menu under its item's right
 * edge, submenus to the left, the arrows mirrored. Only the area is marked
 * right to left; the menus take it from there.
 */
@Component({
  selector: 'app-rtl-menubar-demo',
  imports: [
    Dir,
    ScMenubar,
    ScMenubarItem,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuPortal,
    ScMenuSubmenuIcon,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
    ScMenuShortcut,
    SiCheckIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex justify-center">
      <div scMenubar aria-label="المتصفح" class="w-72">
        <div scMenubarItem value="ملف">
          ملف
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                <div scMenuGroup>
                  <div scMenuItem value="علامة تبويب جديدة">
                    علامة تبويب جديدة
                    <span scMenuShortcut>⌘T</span>
                  </div>
                  <div scMenuItem value="نافذة جديدة">
                    نافذة جديدة
                    <span scMenuShortcut>⌘N</span>
                  </div>
                  <div
                    scMenuItem
                    value="نافذة التصفح المتخفي الجديدة"
                    [disabled]="true"
                  >
                    نافذة التصفح المتخفي الجديدة
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="مشاركة">
                    مشاركة
                    <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuGroup>
                            <div scMenuItem value="رابط البريد الإلكتروني">
                              رابط البريد الإلكتروني
                            </div>
                            <div scMenuItem value="الرسائل">الرسائل</div>
                            <div scMenuItem value="الملاحظات">الملاحظات</div>
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="طباعة...">
                    طباعة...
                    <span scMenuShortcut>⌘P</span>
                  </div>
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
        <div scMenubarItem value="تعديل">
          تعديل
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                <div scMenuGroup>
                  <div scMenuItem value="تراجع">
                    تراجع
                    <span scMenuShortcut>⌘Z</span>
                  </div>
                  <div scMenuItem value="إعادة">
                    إعادة
                    <span scMenuShortcut>⇧⌘Z</span>
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="بحث">
                    بحث
                    <svg siChevronRightIcon scMenuSubmenuIcon></svg>
                    <ng-template scMenuPortal>
                      <div scMenu>
                        <ng-template scMenuContent>
                          <div scMenuGroup>
                            <div scMenuItem value="البحث على الويب">
                              البحث على الويب
                            </div>
                          </div>
                          <div scMenuSeparator></div>
                          <div scMenuGroup>
                            <div scMenuItem value="بحث...">بحث...</div>
                            <div scMenuItem value="البحث التالي">
                              البحث التالي
                            </div>
                            <div scMenuItem value="البحث السابق">
                              البحث السابق
                            </div>
                          </div>
                        </ng-template>
                      </div>
                    </ng-template>
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="قص">قص</div>
                  <div scMenuItem value="نسخ">نسخ</div>
                  <div scMenuItem value="لصق">لصق</div>
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
        <div scMenubarItem value="عرض">
          عرض
          <ng-template scMenuPortal>
            <div scMenu class="w-44">
              <ng-template scMenuContent>
                <div scMenuGroup>
                  <div scMenuCheckboxItem [(checked)]="bookmarksBar">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    شريط الإشارات المرجعية
                  </div>
                  <div scMenuCheckboxItem [(checked)]="fullUrls">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    عناوين URL الكاملة
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="إعادة تحميل" inset>
                    إعادة تحميل
                    <span scMenuShortcut>⌘R</span>
                  </div>
                  <div
                    scMenuItem
                    value="إعادة تحميل قسري"
                    [disabled]="true"
                    inset
                  >
                    إعادة تحميل قسري
                    <span scMenuShortcut>⇧⌘R</span>
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="تبديل وضع ملء الشاشة" inset>
                    تبديل وضع ملء الشاشة
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="إخفاء الشريط الجانبي" inset>
                    إخفاء الشريط الجانبي
                  </div>
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
        <div scMenubarItem value="الملفات الشخصية">
          الملفات الشخصية
          <ng-template scMenuPortal>
            <div scMenu>
              <ng-template scMenuContent>
                <div scMenuRadioGroup [(value)]="profile">
                  <div scMenuRadioItem value="andy">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    Andy
                  </div>
                  <div scMenuRadioItem value="benoit">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    Benoit
                  </div>
                  <div scMenuRadioItem value="luis">
                    <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                    Luis
                  </div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="تعديل..." inset>تعديل...</div>
                </div>
                <div scMenuSeparator></div>
                <div scMenuGroup>
                  <div scMenuItem value="إضافة ملف شخصي..." inset>
                    إضافة ملف شخصي...
                  </div>
                </div>
              </ng-template>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMenubarDemo {
  protected readonly bookmarksBar = signal(false);
  protected readonly fullUrls = signal(true);
  protected readonly profile = signal('benoit');
}`;
}
