import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
} from '@semantic-components/ui-lab';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** The divider follows the pointer, without a press (the keys still work on it). */
@Component({
  selector: 'app-hover-compare-demo',
  imports: [
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    SiChevronsLeftRightIcon,
  ],
  template: `
    <div scCompare hover class="aspect-3/2 w-full max-w-2xl rounded-lg">
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
      <div scCompareHandle aria-label="Before and after">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverCompareDemo {}
