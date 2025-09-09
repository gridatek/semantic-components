import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ColorPickerDemoSection } from './color-picker-demo-section';

@Component({
  selector: 'app-color-picker-page',
  imports: [ColorPickerDemoSection],
  template: `
    <app-color-picker-demo-section />
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColorPickerPage {}
