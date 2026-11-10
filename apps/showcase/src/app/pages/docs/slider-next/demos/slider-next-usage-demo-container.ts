import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { SliderNextUsageDemo } from './slider-next-usage-demo';

@Component({
  selector: 'app-slider-next-usage-demo-container',
  imports: [UsageCode, SliderNextUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-slider-next-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SliderNextUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScSliderNext } from '@semantic-components/ui';

/** A slider, named by aria-label (no label beside it). */
@Component({
  selector: 'app-slider-next-usage-demo',
  imports: [ScSliderNext],
  template: \`
    <input
      type="range"
      scSliderNext
      [(value)]="volume"
      aria-label="Volume"
      class="max-w-xs"
    />
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SliderNextUsageDemo {
  protected readonly volume = signal(75);
}`;
}
