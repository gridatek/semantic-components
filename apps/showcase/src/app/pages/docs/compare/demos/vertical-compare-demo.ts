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
import { SiChevronsUpDownIcon } from '@semantic-icons/lucide-icons';

/** Top and bottom: the divider moves up and down. */
@Component({
  selector: 'app-vertical-compare-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiChevronsUpDownIcon,
  ],
  template: `
    <div
      scCompare
      orientation="vertical"
      scFrame
      class="aspect-3/2 w-full max-w-2xl"
    >
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
        <svg siChevronsUpDownIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalCompareDemo {}
