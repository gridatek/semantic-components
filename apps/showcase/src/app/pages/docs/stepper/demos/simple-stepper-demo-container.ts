import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SimpleStepperDemo } from './simple-stepper-demo';

@Component({
  selector: 'app-simple-stepper-demo-container',
  imports: [DemoContainer, SimpleStepperDemo],
  template: `
    <app-demo-container title="Simple Stepper" [code]="code">
      <app-simple-stepper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStepperDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStepper,
  ScStepperList,
  ScStepperItem,
  ScStepperTrigger,
  ScStepperSeparator,
  ScStepperPrevious,
  ScStepperNext,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-simple-stepper-demo',
  imports: [
    ScStepper,
    ScStepperList,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperPrevious,
    ScStepperNext,
  ],
  template: \`
    <div class="rounded-lg border p-6">
      <div scStepper [(activeStep)]="activeStep">
        <div scStepperList>
          <div scStepperItem [step]="0">
            <button scStepperTrigger></button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="1">
            <button scStepperTrigger></button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="2">
            <button scStepperTrigger></button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="3">
            <button scStepperTrigger></button>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-2">
          <button scStepperPrevious>Back</button>
          <button scStepperNext>Continue</button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStepperDemo {
  readonly activeStep = signal(0);
}`;
}
