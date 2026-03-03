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
    <app-demo-container
      title="Basic"
      demoUrl="/demos/slider/basic-slider-demo"
      [code]="code"
    >
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
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScField, ScLabel, ScSlider } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-slider-demo',
  imports: [ScSlider, ScField, ScLabel],
  template: \`
    <div scField class="w-[280px]">
      <label scLabel>Volume — {{ value() }}</label>
      <input scSlider [value]="value()" (input)="onInput($event)" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicSliderDemo {
  readonly value = signal(50);

  onInput(event: Event): void {
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}`;
}
