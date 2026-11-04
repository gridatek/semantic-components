import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

@Component({
  selector: 'app-aspect-ratio-usage-demo',
  imports: [NgOptimizedImage, ScAspectRatio],
  template: `
    <div
      scAspectRatio
      [ratio]="16 / 9"
      class="bg-muted w-full max-w-sm rounded-lg"
    >
      <img
        ngSrc="/images/gallery/forest.jpg"
        fill
        priority
        alt="A forest path"
        class="rounded-lg object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioUsageDemo {}
