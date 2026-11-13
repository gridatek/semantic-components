import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

/** Right to left: the tabs from the right, the arrows mirrored. Only the area is marked right to left. */
@Component({
  selector: 'app-rtl-tabs-demo',
  imports: [
    Dir,
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsContent,
    ScCard,
    ScCardHeader,
    ScCardTitle,
    ScCardDescription,
    ScCardBody,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scTabs value="overview" class="w-full max-w-sm">
        <div scTabsList>
          <button scTabsTab value="overview">نظرة عامة</button>
          <button scTabsTab value="analytics">التحليلات</button>
          <button scTabsTab value="reports">التقارير</button>
          <button scTabsTab value="settings">الإعدادات</button>
        </div>
        <div scTabsPanel value="overview">
          <ng-template scTabsContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>نظرة عامة</div>
                <p scCardDescription>
                  عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر
                  جميع مشاريعك النشطة.
                </p>
              </div>
              <div scCardBody class="text-muted-foreground text-sm">
                لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.
              </div>
            </div>
          </ng-template>
        </div>
        <div scTabsPanel value="analytics">
          <ng-template scTabsContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>التحليلات</div>
                <p scCardDescription>
                  تتبع مقاييس الأداء ومشاركة المستخدمين. راقب الاتجاهات وحدد فرص
                  النمو.
                </p>
              </div>
              <div scCardBody class="text-muted-foreground text-sm">
                زادت مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.
              </div>
            </div>
          </ng-template>
        </div>
        <div scTabsPanel value="reports">
          <ng-template scTabsContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>التقارير</div>
                <p scCardDescription>
                  إنشاء وتنزيل تقاريرك التفصيلية. تصدير البيانات بتنسيقات متعددة
                  للتحليل.
                </p>
              </div>
              <div scCardBody class="text-muted-foreground text-sm">
                لديك ٥ تقارير جاهزة ومتاحة للتصدير.
              </div>
            </div>
          </ng-template>
        </div>
        <div scTabsPanel value="settings">
          <ng-template scTabsContent>
            <div scCard>
              <div scCardHeader>
                <div scCardTitle>الإعدادات</div>
                <p scCardDescription>
                  إدارة تفضيلات حسابك وخياراته. تخصيص تجربتك لتناسب احتياجاتك.
                </p>
              </div>
              <div scCardBody class="text-muted-foreground text-sm">
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
export class RtlTabsDemo {}
