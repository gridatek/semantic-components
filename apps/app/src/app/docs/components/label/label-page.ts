import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FloatingLabelDemoSection } from './floating-label-demo-section';
import { LabelDemoSection } from './label-demo-section';

@Component({
  selector: 'app-label-page',
  imports: [LabelDemoSection, FloatingLabelDemoSection],
  template: `
    <app-label-demo-section />
    <app-floating-label-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabelPage {}
