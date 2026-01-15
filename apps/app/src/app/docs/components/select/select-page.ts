import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SelectDemoSection } from './select-demo-section';
import { SelectLegacyDemoSection } from './select-legacy-demo-section';

@Component({
  selector: 'app-select-page',
  imports: [SelectDemoSection, SelectLegacyDemoSection],
  template: `
    <app-select-legacy-demo-section />
    <app-select-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {}
