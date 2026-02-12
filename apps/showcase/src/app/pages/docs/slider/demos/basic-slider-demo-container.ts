import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicSliderDemo } from './basic-slider-demo';

@Component({
  selector: 'app-basic-slider-demo-container',
  imports: [DemoContainer, BasicSliderDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-slider-demo',
  imports: [ScSlider],
  template: \`
    <div class="w-[60%]">
      <div sc-slider [(value)]="basicValue"></div>
      <p class="mt-2 text-sm text-muted-foreground">
        Value: {{ basicValue() }}
      </p>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSliderDemo {
  readonly basicValue = signal(33);
}`;
}
