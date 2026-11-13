import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSliderDemo } from './rtl-slider-demo';

@Component({
  selector: 'app-rtl-slider-demo-container',
  imports: [DemoContainer, RtlSliderDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/slider/rtl-slider-demo"
      [code]="code"
    >
      <app-rtl-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSliderDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSlider } from '@semantic-components/ui';

/** In a right-to-left page: the value grows to the left, the arrows mirrored. */
@Component({
  selector: 'app-rtl-slider-demo',
  imports: [Dir, ScSlider],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-xs">
      <input scSlider [(value)]="volume" aria-label="مستوى الصوت" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSliderDemo {
  protected readonly volume = signal(75);
}`;
}
