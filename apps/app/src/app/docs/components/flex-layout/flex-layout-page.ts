import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { FlexLayoutAlignmentSection } from './flex-layout-alignment-section';
import { FlexLayoutDemoSection } from './flex-layout-demo-section';
import { FlexLayoutDirectionSection } from './flex-layout-direction-section';
import { FlexLayoutResponsiveSection } from './flex-layout-responsive-section';
import { FlexLayoutSizingSection } from './flex-layout-sizing-section';

@Component({
  selector: 'app-flex-layout-page',
  imports: [
    FlexLayoutDemoSection,
    FlexLayoutDirectionSection,
    FlexLayoutAlignmentSection,
    FlexLayoutSizingSection,
    FlexLayoutResponsiveSection,
  ],
  template: `
    <app-flex-layout-demo-section />

    <app-flex-layout-direction-section />

    <app-flex-layout-alignment-section />

    <app-flex-layout-sizing-section />

    <app-flex-layout-responsive-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FlexLayoutPage {}
