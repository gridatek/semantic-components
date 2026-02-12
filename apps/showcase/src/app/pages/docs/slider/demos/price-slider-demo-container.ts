import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PriceSliderDemo } from './price-slider-demo';

@Component({
  selector: 'app-price-slider-demo-container',
  imports: [DemoContainer, PriceSliderDemo],
  template: `
    <app-demo-container title="Price Filter" [code]="code">
      <app-price-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-price-slider-demo',
  imports: [ScSlider],
  template: \`
    <div class="w-[60%] space-y-2">
      <div class="flex justify-between text-sm">
        <span>Price</span>
        <span class="text-muted-foreground">{{ '$' + price() }}</span>
      </div>
      <div sc-slider [(value)]="price" [min]="0" [max]="1000" [step]="50"></div>
      <div class="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$1000</span>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceSliderDemo {
  readonly price = signal(500);
}`;
}
