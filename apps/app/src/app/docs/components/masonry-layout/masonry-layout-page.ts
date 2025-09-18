import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { MasonryLayoutDemoSection } from './masonry-layout-demo-section';
import { MasonryLayoutResponsiveSection } from './masonry-layout-responsive-section';

@Component({
  selector: 'app-masonry-layout-page',
  imports: [MasonryLayoutDemoSection, MasonryLayoutResponsiveSection],
  template: `
    <app-masonry-layout-demo-section />

    <app-masonry-layout-responsive-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MasonryLayoutPage {}
