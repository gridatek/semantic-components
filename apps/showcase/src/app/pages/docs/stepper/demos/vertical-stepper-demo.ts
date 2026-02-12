import {
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
  template: `
    <div class="max-w-md rounded-lg border p-6">
      <div sc-stepper orientation="vertical" [(activeStep)]="activeStep">
        <div sc-stepper-list>
          <div sc-stepper-item [step]="0">
            <button sc-stepper-trigger></button>
            <div class="flex flex-col pb-4">
              <span sc-stepper-title>Step 1</span>
              <span sc-stepper-description>First step description</span>
              @if (activeStep() === 0) {
                <div class="mt-4 rounded-lg bg-muted p-4">
                  <p class="text-sm">Content for step 1</p>
                </div>
              }
            </div>
            <div sc-stepper-separator></div>
          </div>
          <div sc-stepper-item [step]="1">
            <button sc-stepper-trigger></button>
            <div class="flex flex-col pb-4">
              <span sc-stepper-title>Step 2</span>
              <span sc-stepper-description>Second step description</span>
              @if (activeStep() === 1) {
                <div class="mt-4 rounded-lg bg-muted p-4">
                  <p class="text-sm">Content for step 2</p>
                </div>
              }
            </div>
            <div sc-stepper-separator></div>
          </div>
          <div sc-stepper-item [step]="2">
            <button sc-stepper-trigger></button>
            <div class="flex flex-col">
              <span sc-stepper-title>Step 3</span>
              <span sc-stepper-description>Final step description</span>
              @if (activeStep() === 2) {
                <div class="mt-4 rounded-lg bg-muted p-4">
                  <p class="text-sm">Content for step 3</p>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button sc-stepper-previous>Previous</button>
          <button sc-stepper-next>Next</button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperDemo {
  readonly activeStep = signal(0);
}
