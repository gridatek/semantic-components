import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalStepperDemo } from './vertical-stepper-demo';

@Component({
  selector: 'app-vertical-stepper-demo-container',
  imports: [DemoContainer, VerticalStepperDemo],
  template: `
    <app-demo-container title="Vertical Stepper" [code]="code">
      <app-vertical-stepper-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperDemoContainer {
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
  ScStepperTitle,
  ScStepperDescription,
  ScStepperPrevious,
  ScStepperNext,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-vertical-stepper-demo',
  imports: [
    ScStepper,
    ScStepperList,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperTitle,
    ScStepperDescription,
    ScStepperPrevious,
    ScStepperNext,
  ],
  template: \`
    <div class="max-w-md rounded-lg border p-6">
      <div scStepper orientation="vertical" [(activeStep)]="activeStep">
        <div scStepperList>
          <div scStepperItem [step]="0">
            <button scStepperTrigger></button>
            <div class="flex flex-col pb-4">
              <span scStepperTitle>Step 1</span>
              <span scStepperDescription>First step description</span>
              @if (activeStep() === 0) {
                <div class="mt-4 rounded-lg bg-muted p-4">
                  <p class="text-sm">Content for step 1</p>
                </div>
              }
            </div>
            <div scStepperSeparator></div>
          </div>
          <div scStepperItem [step]="1">
            <button scStepperTrigger></button>
            <div class="flex flex-col pb-4">
              <span scStepperTitle>Step 2</span>
              <span scStepperDescription>Second step description</span>
              @if (activeStep() === 1) {
                <div class="mt-4 rounded-lg bg-muted p-4">
                  <p class="text-sm">Content for step 2</p>
                </div>
              }
            </div>
            <div scStepperSeparator></div>
          </div>
          <div scStepperItem [step]="2">
            <button scStepperTrigger></button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 3</span>
              <span scStepperDescription>Final step description</span>
              @if (activeStep() === 2) {
                <div class="mt-4 rounded-lg bg-muted p-4">
                  <p class="text-sm">Content for step 3</p>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button scStepperPrevious>Previous</button>
          <button scStepperNext>Next</button>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperDemo {
  readonly activeStep = signal(0);
}`;
}
