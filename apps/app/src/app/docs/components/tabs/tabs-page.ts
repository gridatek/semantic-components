import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AriaTabsDemoSection } from './aria-tabs-demo-section';
import { TabsDemoSection } from './tabs-demo-section';

@Component({
  selector: 'app-tabs-page',
  imports: [TabsDemoSection, AriaTabsDemoSection],
  template: `
    <app-tabs-demo-section />
    <app-aria-tabs-demo-section title="Angular ARIA Tabs" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsPage {}
