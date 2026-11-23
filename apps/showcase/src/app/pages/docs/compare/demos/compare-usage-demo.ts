import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** Two photos, before and after an edit: drag the divider, click anywhere, or use the keys on it. */
@Component({
  selector: 'app-compare-usage-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiChevronsLeftRightIcon,
  ],
  template: `
    <div scCompare scFrame class="aspect-3/2 w-full max-w-2xl">
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
      <span scCompareLabel="before">Before</span>
      <span scCompareLabel="after">After</span>
      <div scCompareHandle aria-label="Before and after">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CompareUsageDemo {}
