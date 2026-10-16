import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompare,
  ScCompareAfter,
  ScCompareBefore,
  ScCompareHandle,
  ScCompareLabel,
} from '@semantic-components/ui-lab';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** Two photos, before and after an edit: drag the divider, click anywhere, or use the keys on it. */
@Component({
  selector: 'app-basic-compare-demo',
  imports: [
    ScCompare,
    ScCompareBefore,
    ScCompareAfter,
    ScCompareHandle,
    ScCompareLabel,
    SiChevronsLeftRightIcon,
  ],
  template: `
    <div scCompare class="aspect-3/2 w-full max-w-2xl rounded-lg">
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
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicCompareDemo {}
