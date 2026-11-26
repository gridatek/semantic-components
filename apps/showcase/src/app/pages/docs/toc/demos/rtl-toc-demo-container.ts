import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTocDemo } from './rtl-toc-demo';

@Component({
  selector: 'app-rtl-toc-demo-container',
  imports: [DemoContainer, RtlTocDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/toc/rtl-toc-demo"
      [code]="code"
    >
      <app-rtl-toc-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTocDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScToc,
  ScTocHeading,
  ScTocLink,
  ScTocList,
  ScTocScope,
} from '@semantic-components/ui';

/**
 * Right to left: the list on the left of the text, the deeper headings
 * indented from the right; the ids keep the Arabic letters.
 */
@Component({
  selector: 'app-rtl-toc-demo',
  imports: [
    ScFrame,
    Dir,
    ScToc,
    ScTocHeading,
    ScTocLink,
    ScTocList,
    ScTocScope,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div
      scTocScope
      dir="rtl"
      lang="ar"
      class="grid grid-cols-1 w-full max-w-2xl gap-6 sm:grid-cols-[minmax(0,1fr)_10rem]"
    >
      <div
        tabindex="0"
        role="region"
        aria-label="الدليل"
        scFrame
        class="h-72 overflow-y-auto p-4"
      >
        <h3 scTocHeading class="scroll-mt-4 text-sm font-semibold">التثبيت</h3>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          أضف الحزمة إلى تطبيقك باستخدام مدير الحزم.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">npm</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          أمر واحد، ثم استورد ما تستخدمه.
        </p>
        <h3 scTocHeading class="scroll-mt-4 text-sm font-semibold">الإعداد</h3>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          اختر نمطًا وسمة للتطبيق كله.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">الأنماط</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          ثمانية أنماط، من الأكثر إحكامًا إلى الأكثر استدارة.
        </p>
        <h4 scTocHeading class="scroll-mt-4 text-sm font-medium">السمات</h4>
        <p class="text-muted-foreground mt-2 mb-6 text-sm">
          فاتحة أو داكنة أو حسب النظام، بألوانك.
        </p>
      </div>
      <nav scToc #toc="scToc" aria-label="محتويات الدليل">
        <p class="mb-3 text-sm font-medium">في هذه الصفحة</p>
        <ul scTocList>
          @for (item of toc.items(); track item.id) {
            <li>
              <a [scTocLink]="item.id" [depth]="item.depth">{{ item.text }}</a>
            </li>
          }
        </ul>
      </nav>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTocDemo {}`;
}
