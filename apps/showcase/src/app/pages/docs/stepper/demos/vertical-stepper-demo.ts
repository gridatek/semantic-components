import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScStepper,
  ScStepperDescription,
  ScStepperIndicator,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPanel,
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
    ScStepperIndicator,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperTitle,
    ScStepperDescription,
    ScStepperPanel,
    ScStepperPrevious,
    ScStepperNext,
    SiCheckIcon,
  ],
  template: `
    <div class="w-full max-w-xl rounded-lg border p-6">
      <div
        scStepper
        orientation="vertical"
        [(selectedIndex)]="selectedIndex"
        class="flex-row gap-8"
      >
        <div scStepperList>
          <div scStepperItem #item0="scStepperItem">
            <button scStepperTrigger>
              <span scStepperIndicator>
                @if (item0.status() === 'complete') {
                  <svg siCheckIcon></svg>
                } @else {
                  1
                }
              </span>
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 1</span>
              <span scStepperDescription>First step description</span>
            </div>
          </div>
          <div scStepperSeparator [step]="0"></div>

          <div scStepperItem #item1="scStepperItem">
            <button scStepperTrigger>
              <span scStepperIndicator>
                @if (item1.status() === 'complete') {
                  <svg siCheckIcon></svg>
                } @else {
                  2
                }
              </span>
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 2</span>
              <span scStepperDescription>Second step description</span>
            </div>
          </div>
          <div scStepperSeparator [step]="1"></div>
          <div scStepperItem #item2="scStepperItem">
            <button scStepperTrigger>
              <span scStepperIndicator>
                @if (item2.status() === 'complete') {
                  <svg siCheckIcon></svg>
                } @else {
                  3
                }
              </span>
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Step 3</span>
              <span scStepperDescription>Final step description</span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col">
          @for (step of steps; track step) {
            <div scStepperPanel [step]="$index">
              <div class="bg-muted rounded-lg p-4">
                <p class="text-sm">{{ step }}</p>
              </div>
            </div>
          }

          <div class="mt-auto flex justify-between pt-6">
            <button scStepperPrevious>Previous</button>
            <button scStepperNext>Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalStepperDemo {
  readonly selectedIndex = signal(0);
  readonly steps = [
    'Content for step 1',
    'Content for step 2',
    'Content for step 3',
  ];
}
