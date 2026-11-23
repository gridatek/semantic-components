import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HoverCompareNextDemo } from './hover-compare-next-demo';

@Component({
  selector: 'app-hover-compare-next-demo-container',
  imports: [DemoContainer, HoverCompareNextDemo],
  template: `
    <app-demo-container
      title="Hover"
      [code]="code"
      demoUrl="/demos/compare-next/hover-compare-next-demo"
    >
      <app-hover-compare-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverCompareNextDemoContainer {
  private readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCompareNext,
  ScCompareNextAfter,
  ScCompareNextBefore,
  ScCompareNextHandle,
  ScFrame,
} from '@semantic-components/ui';
import { SiChevronsLeftRightIcon } from '@semantic-icons/lucide-icons';

/** The divider follows the pointer, without a press (the keys still work on it). */
@Component({
  selector: 'app-hover-compare-next-demo',
  imports: [
    ScFrame,
    NgOptimizedImage,
    ScCompareNext,
    ScCompareNextBefore,
    ScCompareNextAfter,
    ScCompareNextHandle,
    SiChevronsLeftRightIcon,
  ],
  template: \`
    <div scCompareNext hover scFrame class="aspect-3/2 w-full max-w-2xl">
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
      <div scCompareNextHandle aria-label="Before and after">
        <svg siChevronsLeftRightIcon></svg>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HoverCompareNextDemo {}`;
}
