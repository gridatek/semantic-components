import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTabsNext,
  ScTabsNextContent,
  ScTabsNextList,
  ScTabsNextPanel,
  ScTabsNextTab,
} from '@semantic-components/ui';

/** Right to left: the tabs from the right, the arrows mirrored. Only the area is marked right to left. */
@Component({
  selector: 'app-rtl-tabs-next-demo',
  imports: [
    ScTabsNext,
    ScTabsNextList,
    ScTabsNextTab,
    ScTabsNextPanel,
    ScTabsNextContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardContent,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scTabsNext value="overview" class="w-full max-w-sm">
        <div scTabsNextList>
          <button scTabsNextTab value="overview">نظرة عامة</button>
          <button scTabsNextTab value="analytics">التحليلات</button>
          <button scTabsNextTab value="reports">التقارير</button>
          <button scTabsNextTab value="settings">الإعدادات</button>
        </div>
        <div scTabsNextPanel value="overview">
          <ng-template scTabsNextContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>نظرة عامة</div>
                <p scCardDescription>
                  عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر
                  جميع مشاريعك النشطة.
                </p>
              </div>
              <div scCardContent class="text-muted-foreground text-sm">
                لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.
              </div>
            </div>
          </ng-template>
        </div>
        <div scTabsNextPanel value="analytics">
          <ng-template scTabsNextContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>التحليلات</div>
                <p scCardDescription>
                  تتبع مقاييس الأداء ومشاركة المستخدمين. راقب الاتجاهات وحدد فرص
                  النمو.
                </p>
              </div>
              <div scCardContent class="text-muted-foreground text-sm">
                زادت مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.
              </div>
            </div>
          </ng-template>
        </div>
        <div scTabsNextPanel value="reports">
          <ng-template scTabsNextContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>التقارير</div>
                <p scCardDescription>
                  إنشاء وتنزيل تقاريرك التفصيلية. تصدير البيانات بتنسيقات متعددة
                  للتحليل.
                </p>
              </div>
              <div scCardContent class="text-muted-foreground text-sm">
                لديك ٥ تقارير جاهزة ومتاحة للتصدير.
              </div>
            </div>
          </ng-template>
        </div>
        <div scTabsNextPanel value="settings">
          <ng-template scTabsNextContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>الإعدادات</div>
                <p scCardDescription>
                  إدارة تفضيلات حسابك وخياراته. تخصيص تجربتك لتناسب احتياجاتك.
                </p>
              </div>
              <div scCardContent class="text-muted-foreground text-sm">
                تكوين الإشعارات والأمان والسمات.
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTabsNextDemo {}
