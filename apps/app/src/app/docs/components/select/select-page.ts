import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SelectDemoSection } from './select-demo-section';

@Component({
  selector: 'app-select-page',
  imports: [SelectDemoSection],
  template: `
    <app-select-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {}
