import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** A square: ratio 1. */
@Component({
  selector: 'app-square-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio, ScFrame],
  template: `
    <div scAspectRatio scFrame [ratio]="1" class="w-full max-w-48">
      <img
        ngSrc="/images/gallery/coast.jpg"
        fill
        priority
        alt="A rocky coast"
        class="object-cover"
      />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SquareAspectRatioDemo {}
