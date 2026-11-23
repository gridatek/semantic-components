import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlCompareNextDemo } from './rtl-compare-next-demo';

@Component({
  selector: 'app-rtl-compare-next-demo-container',
  imports: [DemoContainer, RtlCompareNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/compare-next/rtl-compare-next-demo"
    >
      <app-rtl-compare-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCompareNextDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { NgOptimizedImage } from '@angular/common';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScCompareNext,
  ScCompareNextAfter,
  ScCompareNextBefore,
  ScCompareNextHandle,
  ScCompareNextLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the before on the right, the arrows following the text, the percentage in the locale’s digits. */
@Component({
  selector: 'app-rtl-compare-next-demo',
  imports: [
    Dir,
    ScFrame,
    NgOptimizedImage,
    ScCompareNext,
    ScCompareNextBefore,
    ScCompareNextAfter,
    ScCompareNextHandle,
    ScCompareNextLabel,
    SiChevronsLeftRightIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scCompareNext scFrame class="aspect-3/2 w-full max-w-2xl">
        <img
          scCompareNextBefore
          ngSrc="/images/compare-before.jpg"
          fill
          alt="جبال عند الفجر، كما صُوّرت"
        />
        <img
          scCompareNextAfter
          ngSrc="/images/cropper-mountains.jpg"
          fill
          alt="الصورة نفسها بعد التعديل"
        />
        <span scCompareNextLabel="before">قبل</span>
        <span scCompareNextLabel="after">بعد</span>
        <div scCompareNextHandle aria-label="قبل وبعد">
          <svg siChevronsLeftRightIcon></svg>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCompareNextDemo {}`;
}
