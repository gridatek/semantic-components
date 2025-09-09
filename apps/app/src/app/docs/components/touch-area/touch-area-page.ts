import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TouchAreaDemoSection } from './touch-area-demo-section';

@Component({
  selector: 'app-touch-area-page',
  imports: [TouchAreaDemoSection],
  template: `
    <app-touch-area-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TouchAreaPage {}
