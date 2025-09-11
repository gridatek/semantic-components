import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FieldDemoSection } from './field-demo-section';
import { FieldFloatingSection } from './field-floating-section';

@Component({
  selector: 'app-field-page',
  imports: [FieldDemoSection, FieldFloatingSection],
  template: `
    <app-field-demo-section />

    <app-field-demo-section title="Default" />

    <app-field-floating-section title="Floating Labels" />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FieldPage {}
