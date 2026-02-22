import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNativeSliderDemo } from './basic-native-slider-demo';

@Component({
  selector: 'app-basic-native-slider-demo-container',
  imports: [DemoContainer, BasicNativeSliderDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/native-slider/basic-native-slider-demo"
      [code]="code"
    >
      <app-basic-native-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import { ScNativeSlider } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-native-slider-demo',
  imports: [ScNativeSlider, ScField, ScLabel],
  template: \`
    <div scField class="w-[280px]">
      <label scLabel>Volume — {{ value() }}</label>
      <input scNativeSlider [value]="value()" (input)="onInput($event)" />
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeSliderDemo {
  readonly value = signal(50);

  onInput(event: Event): void {
    this.value.set(+(event.target as HTMLInputElement).value);
  }
}`;
}
