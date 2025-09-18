import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { GalleryLayoutDemoSection } from './gallery-layout-demo-section';
import { GalleryLayoutResponsiveSection } from './gallery-layout-responsive-section';

@Component({
  selector: 'app-gallery-layout-page',
  imports: [GalleryLayoutDemoSection, GalleryLayoutResponsiveSection],
  template: `
    <app-gallery-layout-demo-section />

    <app-gallery-layout-responsive-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GalleryLayoutPage {}
