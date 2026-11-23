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
import { SiChevronsUpDownIcon } from '@semantic-icons/lucide-icons';

/** Top and bottom: the divider moves up and down. */
@Component({
  selector: 'app-vertical-compare-next-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompareNext,
    ScCompareNextBefore,
    ScCompareNextAfter,
    ScCompareNextHandle,
    ScCompareNextLabel,
    SiChevronsUpDownIcon,
  ],
  template: `
    <div
      scCompareNext
      orientation="vertical"
      scFrame
      class="aspect-3/2 w-full max-w-2xl"
    >
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
        <svg siChevronsUpDownIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalCompareNextDemo {}
