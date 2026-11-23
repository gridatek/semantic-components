import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** The divider follows the pointer, without a press (the keys still work on it). */
@Component({
  selector: 'app-hover-compare-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    SiChevronsLeftRightIcon,
  ],
  template: `
    <div scCompare hover scFrame class="aspect-3/2 w-full max-w-2xl">
      <img
        scCompareBefore
        ngSrc="/images/compare-before.jpg"
        fill
        priority
        alt="Mountains at dawn, as shot: grey and flat"
      />
      <img
        scCompareAfter
        ngSrc="/images/cropper-mountains.jpg"
        fill
        priority
        alt="The same photo, edited: warm light and deep colours"
      />
      <div scCompareHandle aria-label="Before and after">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverCompareDemo {}
