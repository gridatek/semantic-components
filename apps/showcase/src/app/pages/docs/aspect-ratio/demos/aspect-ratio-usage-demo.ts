import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

@Component({
  selector: 'app-aspect-ratio-usage-demo',
  imports: [NgOptimizedImage, ScAspectRatio, ScFrame],
  template: `
    <div scAspectRatio scFrame [ratio]="16 / 9" class="w-full max-w-sm">
      <img
        ngSrc="/images/gallery/forest.jpg"
        fill
        priority
        alt="A forest path"
        class="object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioUsageDemo {}
