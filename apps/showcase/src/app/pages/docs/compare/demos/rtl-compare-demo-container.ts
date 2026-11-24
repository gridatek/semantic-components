import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlCompareDemo } from './rtl-compare-demo';

@Component({
  selector: 'app-rtl-compare-demo-container',
  imports: [DemoContainer, RtlCompareDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/compare/rtl-compare-demo"
    >
      <app-rtl-compare-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCompareDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { NgOptimizedImage } from '@angular/common';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the before on the right, the arrows following the text, the percentage in the locale’s digits. */
@Component({
  selector: 'app-rtl-compare-demo',
  imports: [
    Dir,
    ScFrame,
    NgOptimizedImage,
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiChevronsLeftRightIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scCompare scFrame class="aspect-3/2 w-full max-w-2xl">
        <img
          scCompareBefore
          ngSrc="/images/compare-before.jpg"
          fill
          priority
          alt="جبال عند الفجر، كما صُوّرت"
        />
        <img
          scCompareAfter
          ngSrc="/images/cropper-mountains.jpg"
          fill
          priority
          alt="الصورة نفسها بعد التعديل"
        />
        <span scCompareLabel="before">قبل</span>
        <span scCompareLabel="after">بعد</span>
        <div scCompareHandle aria-label="قبل وبعد">
          <svg siChevronsLeftRightIcon></svg>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCompareDemo {}`;
}
