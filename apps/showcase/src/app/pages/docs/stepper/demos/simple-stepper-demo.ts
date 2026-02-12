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
  template: `
    <div class="rounded-lg border p-6">
      <div sc-stepper [(activeStep)]="activeStep">
        <div sc-stepper-list>
          <div sc-stepper-item [step]="0">
            <button sc-stepper-trigger></button>
          </div>
          <div sc-stepper-separator></div>
          <div sc-stepper-item [step]="1">
            <button sc-stepper-trigger></button>
          </div>
          <div sc-stepper-separator></div>
          <div sc-stepper-item [step]="2">
            <button sc-stepper-trigger></button>
          </div>
          <div sc-stepper-separator></div>
          <div sc-stepper-item [step]="3">
            <button sc-stepper-trigger></button>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-2">
          <button sc-stepper-previous>Back</button>
          <button sc-stepper-next>Continue</button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStepperDemo {
  readonly activeStep = signal(0);
}
