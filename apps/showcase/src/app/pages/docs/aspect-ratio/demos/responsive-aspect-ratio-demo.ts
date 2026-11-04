import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

/** A class over the ratio: square on a phone, 16 / 9 beyond (the ratio is a CSS variable, so a class wins). */
@Component({
  selector: 'app-responsive-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio],
  template: `
    <div
      scAspectRatio
      [ratio]="16 / 9"
      class="bg-muted w-full max-w-sm rounded-lg max-sm:aspect-square"
    >
      <img
        ngSrc="/images/gallery/mountains.jpg"
        fill
        priority
        alt="Mountains"
        class="rounded-lg object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ResponsiveAspectRatioDemo {}
