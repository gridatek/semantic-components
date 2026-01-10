import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AriaTabsDemoSection } from './aria-tabs-demo-section';
import { NewTabsDemoSection } from './new-tabs-demo-section';
import { TabsDemoSection } from './tabs-demo-section';

@Component({
  selector: 'app-tabs-page',
  imports: [TabsDemoSection, AriaTabsDemoSection, NewTabsDemoSection],
  template: `
    <app-tabs-demo-section />
    <app-aria-tabs-demo-section title="Angular ARIA Tabs" />
    <app-new-tabs-demo-section title="New Tabs (Wrapper Components)" level="3" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TabsPage {}
