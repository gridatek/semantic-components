import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrubAreaDemoSection } from './scrub-area-demo-section';

@Component({
  selector: 'app-scrub-area-page',
  imports: [ScrubAreaDemoSection],
  template: `
    <app-scrub-area-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ScrubAreaPage {}
