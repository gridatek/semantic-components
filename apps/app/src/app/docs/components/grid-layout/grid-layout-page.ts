import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { GridLayoutDemoSection } from './grid-layout-demo-section';
import { GridLayoutFlowSection } from './grid-layout-flow-section';
import { GridLayoutResponsiveSection } from './grid-layout-responsive-section';
import { GridLayoutSizingSection } from './grid-layout-sizing-section';

@Component({
  selector: 'app-grid-layout-page',
  imports: [
    GridLayoutDemoSection,
    GridLayoutResponsiveSection,
    GridLayoutSizingSection,
    GridLayoutFlowSection,
  ],
  template: `
    <app-grid-layout-demo-section />

    <app-grid-layout-responsive-section />

    <app-grid-layout-sizing-section />

    <app-grid-layout-flow-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridLayoutPage {}
