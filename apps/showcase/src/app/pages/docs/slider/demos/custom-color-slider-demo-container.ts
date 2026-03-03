import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomColorSliderDemo } from './custom-color-slider-demo';

@Component({
  selector: 'app-custom-color-slider-demo-container',
  imports: [DemoContainer, CustomColorSliderDemo],
  template: `
    <app-demo-container
      title="Custom Color"
      demoUrl="/demos/slider/custom-color-slider-demo"
      [code]="code"
    >
      <app-custom-color-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel, ScSlider } from '@semantic-components/ui';

@Component({
  selector: 'app-custom-color-slider-demo',
  imports: [ScSlider, ScField, ScLabel],
  template: \`
    <div
      scField
      class="w-[280px]"
      style="--primary: oklch(0.6 0.25 30); --muted: oklch(0.9 0.05 30); --ring: oklch(0.6 0.25 30)"
    >
      <label scLabel>Temperature — {{ value() }}</label>
      <input scSlider [value]="value()" (input)="onInput($event)" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomColorSliderDemo {
  readonly value = signal(50);

  onInput(event: Event): void {
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}`;
}
