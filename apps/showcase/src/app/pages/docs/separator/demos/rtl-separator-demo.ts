import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';

/** In a right-to-left page: the text from the right; the line is the same. */
@Component({
  selector: 'app-rtl-separator-demo',
  imports: [Dir, ScSeparator],
  template: `
    <div dir="rtl" lang="ar">
      <div class="flex max-w-sm flex-col gap-4 text-sm">
        <div class="flex flex-col gap-1.5">
          <div class="leading-none font-medium">shadcn/ui</div>
          <div class="text-muted-foreground">الأساس لنظام التصميم الخاص بك</div>
        </div>
        <div scSeparator></div>
        <div>
          مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء
          عليها.
        </div>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSeparatorDemo {}
