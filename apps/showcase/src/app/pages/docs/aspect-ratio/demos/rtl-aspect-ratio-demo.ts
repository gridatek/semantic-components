import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

/** Right to left: the ratio doesn't change; the caption reads from the right. */
@Component({
  selector: 'app-rtl-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio],
  template: `
    <figure dir="rtl" lang="ar" class="grid w-full max-w-sm gap-2">
      <div scAspectRatio [ratio]="16 / 9" class="bg-muted rounded-lg">
        <img
          ngSrc="/images/gallery/cafe.jpg"
          fill
          priority
          alt="مقهى"
          class="rounded-lg object-cover"
        />
      </div>
      <figcaption class="text-muted-foreground text-sm">
        مقهى صغير في المدينة القديمة.
      </figcaption>
    </figure>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAspectRatioDemo {}
