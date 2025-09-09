import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DualRangeSliderDemoSection } from './dual-range-slider-demo-section';

@Component({
  selector: 'app-dual-range-slider-page',
  imports: [DualRangeSliderDemoSection],
  template: `
    <app-dual-range-slider-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DualRangeSliderPage {}
