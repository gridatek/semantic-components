import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScStepper,
  ScStepperDescription,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPrevious,
  ScStepperSeparator,
  ScStepperTitle,
  ScStepperTrigger,
} from '@semantic-components/ui-lab';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

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
    SiCheckIcon,
  ],
  template: `
    <div class="max-w-md rounded-lg border p-6">
      <div scStepper orientation="vertical" [(activeStep)]="activeStep">
        <div scStepperList>
          <div scStepperItem [step]="0">
            <button scStepperTrigger #t0="scStepperTrigger">
              @if (t0.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t0.stepperItem.step() + 1 }}</span>
              }
            </button>
            <div class="flex flex-col pb-4">
              <span scStepperTitle>Step 1</span>
              <span scStepperDescription>First step description</span>
              @if (activeStep() === 0) {
                <div class="bg-muted mt-4 rounded-lg p-4">
                  <p class="text-sm">Content for step 1</p>
                </div>
              }
            </div>
            <div scStepperSeparator></div>
          </div>
          <div scStepperItem [step]="1">
            <button scStepperTrigger #t1="scStepperTrigger">
              @if (t1.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t1.stepperItem.step() + 1 }}</span>
              }
            </button>
            <div class="flex flex-col pb-4">
              <span scStepperTitle>Step 2</span>
              <span scStepperDescription>Second step description</span>
              @if (activeStep() === 1) {
                <div class="bg-muted mt-4 rounded-lg p-4">
                  <p class="text-sm">Content for step 2</p>
                </div>
              }
            </div>
            <div scStepperSeparator></div>
          </div>
          <div scStepperItem [step]="2">
            <button scStepperTrigger #t2="scStepperTrigger">
              @if (t2.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t2.stepperItem.step() + 1 }}</span>
              }
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 3</span>
              <span scStepperDescription>Final step description</span>
              @if (activeStep() === 2) {
                <div class="bg-muted mt-4 rounded-lg p-4">
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
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperDemo {
  readonly activeStep = signal(0);
}
