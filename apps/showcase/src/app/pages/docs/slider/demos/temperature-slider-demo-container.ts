import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TemperatureSliderDemo } from './temperature-slider-demo';

@Component({
  selector: 'app-temperature-slider-demo-container',
  imports: [DemoContainer, TemperatureSliderDemo],
  template: `
    <app-demo-container title="Temperature" [code]="code">
      <app-temperature-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-temperature-slider-demo',
  imports: [ScSlider],
  template: \`
    <div class="w-[60%] rounded-lg border p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Room Temperature</span>
        <span class="text-2xl font-bold">{{ temperature() }}&deg;C</span>
      </div>
      <div
        sc-slider
        [(value)]="temperature"
        [min]="16"
        [max]="30"
        class="mt-4"
      ></div>
      <div class="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>16&deg;C</span>
        <span>30&deg;C</span>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureSliderDemo {
  readonly temperature = signal(22);
}`;
}
