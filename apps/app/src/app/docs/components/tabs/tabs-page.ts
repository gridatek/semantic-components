import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { TabsDemoSection } from './tabs-demo-section';

@Component({
  selector: 'app-tabs-page',
  imports: [TabsDemoSection],
  template: `
    <app-tabs-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsPage {}
