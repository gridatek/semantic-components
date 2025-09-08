import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SelectDemo2 } from './select-demo2';
import { SelectDemoSection } from './select-demo-section';

@Component({
  selector: 'app-select-page',
  imports: [SelectDemoSection, SelectDemo2],
  template: `
    <app-select-demo-section />

    <app-select-demo2 />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {}
