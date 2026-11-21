import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScFrame, ScMarquee, ScMarqueeContent } from '@semantic-components/ui';

/**
 * In a right-to-left page: toward the reading start is toward the right — as
 * Arabic news tickers run — with nothing to change.
 */
@Component({
  selector: 'app-rtl-marquee-demo',
  imports: [Dir, ScFrame, ScMarquee, ScMarqueeContent],
  template: `
    <section
      dir="rtl"
      lang="ar"
      scFrame
      size="xs"
      aria-label="العناوين"
      class="bg-primary text-primary-foreground w-full py-2"
    >
      <div scMarquee [speed]="80" [gap]="24">
        <ng-template scMarqueeContent>
          @for (headline of headlines; track headline) {
            <span class="text-sm font-medium whitespace-nowrap">{{
              headline
            }}</span>
            <span aria-hidden="true">•</span>
          }
        </ng-template>
      </div>
    </section>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlMarqueeDemo {
  private readonly headlines = [
    'الإصدار 2.4 متاح الآن',
    'مكونات جديدة كل أسبوع',
    'انضم إلى المجتمع',
    'التوثيق باللغة العربية قريبًا',
  ];
}
