import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScWaterfall,
  ScWaterfallAxis,
  ScWaterfallBar,
  ScWaterfallColumnHeader,
  ScWaterfallHeaderRow,
  ScWaterfallIndicator,
  type ScWaterfallItem,
  ScWaterfallRow,
  ScWaterfallRowHeader,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the bars from the right, ← opens a span, the times in the locale’s digits. */
@Component({
  selector: 'app-rtl-waterfall-demo',
  imports: [
    Dir,
    ScWaterfall,
    ScWaterfallAxis,
    ScWaterfallBar,
    ScWaterfallColumnHeader,
    ScWaterfallHeaderRow,
    ScWaterfallIndicator,
    ScWaterfallRow,
    ScWaterfallRowHeader,
    SiChevronRightIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="w-full max-w-2xl">
      <div
        scWaterfall
        #waterfall="scWaterfall"
        aria-label="الطلبات"
        [items]="requests"
      >
        <div scWaterfallHeaderRow>
          <div scWaterfallColumnHeader class="w-48">الاسم</div>
          <div
            scWaterfallColumnHeader
            aria-label="الزمن"
            class="min-w-24 flex-1"
          >
            <div scWaterfallAxis></div>
          </div>
        </div>
        @for (row of waterfall.rows(); track row.item.value) {
          <div scWaterfallRow [row]="row">
            <div scWaterfallRowHeader>
              <button scWaterfallIndicator>
                <svg siChevronRightIcon></svg>
              </button>
              {{ row.item.label }}
            </div>
            <div scWaterfallBar></div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlWaterfallDemo {
  private readonly requests: ScWaterfallItem[] = [
    {
      value: 'page',
      label: 'الصفحة',
      start: 0,
      duration: 600,
      children: [
        { value: 'styles', label: 'الأنماط', start: 100, duration: 150 },
        { value: 'script', label: 'البرنامج', start: 120, duration: 400 },
      ],
    },
    { value: 'image', label: 'الصورة', start: 300, duration: 500 },
  ];
}
