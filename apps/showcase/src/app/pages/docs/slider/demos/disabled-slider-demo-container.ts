import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSliderDemo } from './disabled-slider-demo';

@Component({
  selector: 'app-disabled-slider-demo-container',
  imports: [DemoContainer, DisabledSliderDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-slider-demo',
  imports: [ScSlider],
  template: \`
    <div class="w-[60%]">
      <div sc-slider [value]="50" [disabled]="true"></div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSliderDemo {}`;
}
