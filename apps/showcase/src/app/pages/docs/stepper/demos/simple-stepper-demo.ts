import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScStepper,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPrevious,
  ScStepperSeparator,
  ScStepperTrigger,
} from '@semantic-components/ui-lab';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

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
    SiCheckIcon,
  ],
  template: `
    <div class="w-full max-w-2xl rounded-lg border p-6">
      <div scStepper [(activeStep)]="activeStep">
        <div scStepperList>
          <div scStepperItem [step]="0">
            <button scStepperTrigger #t0="scStepperTrigger">
              @if (t0.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t0.stepperItem.step() + 1 }}</span>
              }
            </button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="1">
            <button scStepperTrigger #t1="scStepperTrigger">
              @if (t1.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t1.stepperItem.step() + 1 }}</span>
              }
            </button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="2">
            <button scStepperTrigger #t2="scStepperTrigger">
              @if (t2.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t2.stepperItem.step() + 1 }}</span>
              }
            </button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="3">
            <button scStepperTrigger #t3="scStepperTrigger">
              @if (t3.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t3.stepperItem.step() + 1 }}</span>
              }
            </button>
          </div>
        </div>

        <div class="mt-6 flex justify-center gap-2">
          <button scStepperPrevious>Back</button>
          <button scStepperNext>Continue</button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleStepperDemo {
  readonly activeStep = signal(0);
}
