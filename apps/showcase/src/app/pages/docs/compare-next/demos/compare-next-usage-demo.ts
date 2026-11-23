import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompareNext,
  ScCompareNextAfter,
  ScCompareNextBefore,
  ScCompareNextHandle,
  ScCompareNextLabel,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** Two photos, before and after an edit: drag the divider, click anywhere, or use the keys on it. */
@Component({
  selector: 'app-compare-next-usage-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompareNext,
    ScCompareNextBefore,
    ScCompareNextAfter,
    ScCompareNextHandle,
    ScCompareNextLabel,
    SiChevronsLeftRightIcon,
  ],
  template: `
    <div scCompareNext scFrame class="aspect-3/2 w-full max-w-2xl">
      <img
        scCompareNextBefore
        ngSrc="/images/compare-before.jpg"
        fill
        priority
        alt="Mountains at dawn, as shot: grey and flat"
      />
      <img
        scCompareNextAfter
        ngSrc="/images/cropper-mountains.jpg"
        fill
        priority
        alt="The same photo, edited: warm light and deep colours"
      />
      <span scCompareNextLabel="before">Before</span>
      <span scCompareNextLabel="after">After</span>
      <div scCompareNextHandle aria-label="Before and after">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CompareNextUsageDemo {}
