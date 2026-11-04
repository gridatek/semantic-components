import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** Taller than wide: 9 / 16. */
@Component({
  selector: 'app-portrait-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio, ScFrame],
  template: `
    <div scAspectRatio scFrame [ratio]="9 / 16" class="w-full max-w-40">
      <img
        ngSrc="/images/gallery/gorge.jpg"
        fill
        priority
        alt="A narrow gorge"
        class="object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PortraitAspectRatioDemo {}
