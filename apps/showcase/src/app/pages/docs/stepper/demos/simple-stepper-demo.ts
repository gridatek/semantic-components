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
          <div scStepperItem [step]="0" #item0="scStepperItem">
            <button scStepperTrigger>
              @if (item0.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>1</span>
              }
            </button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="1" #item1="scStepperItem">
            <button scStepperTrigger>
              @if (item1.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>2</span>
              }
            </button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="2" #item2="scStepperItem">
            <button scStepperTrigger>
              @if (item2.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>3</span>
              }
            </button>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="3" #item3="scStepperItem">
            <button scStepperTrigger>
              @if (item3.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>4</span>
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
