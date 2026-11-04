import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

/** Taller than wide: 9 / 16. */
@Component({
  selector: 'app-portrait-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio],
  template: `
    <div
      scAspectRatio
      [ratio]="9 / 16"
      class="bg-muted w-full max-w-40 rounded-lg"
    >
      <img
        ngSrc="/images/gallery/gorge.jpg"
        fill
        priority
        alt="A narrow gorge"
        class="rounded-lg object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PortraitAspectRatioDemo {}
