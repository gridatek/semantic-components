import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
} from '@semantic-components/ui';
import { SiChevronsUpDownIcon } from '@semantic-icons/lucide-icons';

/** Top and bottom: the divider moves up and down. */
@Component({
  selector: 'app-vertical-compare-demo',
  imports: [
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
      class="aspect-3/2 w-full max-w-2xl rounded-lg"
    >
      <img
        scCompareBefore
        src="/images/compare-before.jpg"
        alt="Mountains at dawn, as shot: grey and flat"
      />
      <img
        scCompareAfter
        src="/images/cropper-mountains.jpg"
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
