import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
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
    ScButton,
  ],
  template: `
    <div class="max-w-md rounded-lg border p-6">
      <div scStepper orientation="vertical" [(activeStep)]="activeStep">
        <div scStepperList>
          <div scStepperItem [step]="0" #item0="scStepperItem">
            <button scStepperTrigger>
              @if (item0.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>1</span>
              }
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 1</span>
              <span scStepperDescription>First step description</span>
              @if (activeStep() === 0) {
                <div class="bg-muted mt-4 rounded-lg p-4">
                  <p class="text-sm">Content for step 1</p>
                </div>
              }
            </div>
          </div>
          <div scStepperSeparator [step]="0"></div>

          <div scStepperItem [step]="1" #item1="scStepperItem">
            <button scStepperTrigger>
              @if (item1.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>2</span>
              }
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 2</span>
              <span scStepperDescription>Second step description</span>
              @if (activeStep() === 1) {
                <div class="bg-muted mt-4 rounded-lg p-4">
                  <p class="text-sm">Content for step 2</p>
                </div>
              }
            </div>
          </div>
          <div scStepperSeparator [step]="1"></div>
          <div scStepperItem [step]="2" #item2="scStepperItem">
            <button scStepperTrigger>
              @if (item2.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>3</span>
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
          <button scButton scStepperPrevious variant="outline" size="lg">
            Previous
          </button>
          <button scButton scStepperNext size="lg">Next</button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalStepperDemo {
  readonly activeStep = signal(0);
}
