import { Dir } from '@angular/cdk/bidi';
import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** Right to left: the ratio doesn't change; the caption reads from the right. */
@Component({
  selector: 'app-rtl-aspect-ratio-demo',
  imports: [Dir, NgOptimizedImage, ScAspectRatio, ScFrame],
  template: `
    <figure dir="rtl" lang="ar" class="grid w-full max-w-sm gap-2">
      <div scAspectRatio scFrame [ratio]="16 / 9">
        <img
          ngSrc="/images/gallery/cafe.jpg"
          fill
          priority
          alt="مقهى"
          class="object-cover"
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
