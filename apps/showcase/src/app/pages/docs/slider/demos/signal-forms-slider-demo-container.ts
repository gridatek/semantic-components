import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SignalFormsSliderDemo } from './signal-forms-slider-demo';

@Component({
  selector: 'app-signal-forms-slider-demo-container',
  imports: [DemoContainer, SignalFormsSliderDemo],
  template: `
    <app-demo-container
      title="Signal Forms Integration"
      demoUrl="/demos/slider/signal-forms-slider-demo"
      [code]="code"
    >
      <app-signal-forms-slider-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSliderDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required, min, max } from '@angular/forms/signals';
import { ScSlider } from '@semantic-components/ui-lab';
import { JsonPipe } from '@angular/common';

interface SliderFormModel {
  volume: number;
  brightness: number;
  temperature: number;
}

@Component({
  selector: 'app-signal-forms-slider-demo',
  imports: [ScSlider, JsonPipe, FormField],
  template: \`
    <form>
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Volume</label>
          <div sc-slider [formField]="sliderForm.volume"></div>
          <p class="text-xs text-muted-foreground">
            Current: {{ sliderForm.volume().value() }}%
          </p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">Brightness</label>
          <div sc-slider [formField]="sliderForm.brightness"></div>
          <p class="text-xs text-muted-foreground">
            Current: {{ sliderForm.brightness().value() }}%
          </p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium leading-none">
            Temperature (°C)
          </label>
          <div sc-slider [formField]="sliderForm.temperature"></div>
          <p class="text-xs text-muted-foreground">
            Current: {{ sliderForm.temperature().value() }}°C
          </p>
        </div>
      </div>

      <div class="mt-6 p-4 bg-muted rounded-md">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="text-xs mt-2">{{ formModel() | json }}</pre>
      </div>
    </form>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsSliderDemo {
  readonly formModel = signal<SliderFormModel>({
    volume: 50,
    brightness: 75,
    temperature: 22,
  });

  readonly sliderForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.volume);
    min(schemaPath.volume, 0);
    max(schemaPath.volume, 100);

    required(schemaPath.brightness);
    min(schemaPath.brightness, 0);
    max(schemaPath.brightness, 100);

    required(schemaPath.temperature);
    min(schemaPath.temperature, 16);
    max(schemaPath.temperature, 30);
  });
}`;
}
