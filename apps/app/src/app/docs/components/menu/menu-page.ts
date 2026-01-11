import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AriaMenuDemoSection } from './aria-menu-demo-section';
import { MenuCheckboxesSection } from './menu-checkboxes-section';
import { MenuDemoSection } from './menu-demo-section';
import { MenuRadioGroupSection } from './menu-radio-group-section';

@Component({
  selector: 'app-menu-page',
  imports: [MenuDemoSection, MenuRadioGroupSection, MenuCheckboxesSection, AriaMenuDemoSection],
  template: `
    <app-menu-demo-section />

    <app-menu-checkboxes-section title="Checkboxes" />

    <app-menu-radio-group-section title="Radio Group" />

    <app-aria-menu-demo-section title="Angular ARIA Menu" level="3" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuPage {}
