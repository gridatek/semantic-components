import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

/** A square: ratio 1. */
@Component({
  selector: 'app-square-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio],
  template: `
    <div scAspectRatio [ratio]="1" class="bg-muted w-full max-w-48 rounded-lg">
      <img
        ngSrc="/images/gallery/coast.jpg"
        fill
        priority
        alt="A rocky coast"
        class="rounded-lg object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SquareAspectRatioDemo {}
