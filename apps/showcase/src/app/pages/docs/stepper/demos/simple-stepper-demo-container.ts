import { Component, ViewEncapsulation } from '@angular/core';
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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SimpleStepperDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScStepper,
  ScStepperContent,
  ScStepperIndicator,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPanel,
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
    ScStepperIndicator,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperPanel,
    ScStepperContent,
    ScStepperPrevious,
    ScStepperNext,
    SiCheckIcon,
    ScButton,
  ],
  template: \`
    <div class="w-full max-w-2xl rounded-lg border p-6">
      <div scStepper [(selectedIndex)]="selectedIndex">
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
          </div>
          <div scStepperSeparator [step]="2"></div>
          <div scStepperItem #item3="scStepperItem">
            <button scStepperTrigger>
              <span scStepperIndicator>
                @if (item3.status() === 'complete') {
                  <svg siCheckIcon></svg>
                } @else {
                  4
                }
              </span>
            </button>
          </div>
        </div>

        @for (step of steps; track step) {
          <div scStepperPanel [step]="$index">
            <ng-template scStepperContent>
              <p class="text-muted-foreground text-center text-sm">
                {{ step }}
              </p>
            </ng-template>
          </div>
        }

        <div class="mt-6 flex justify-center gap-2">
          <button scButton scStepperPrevious variant="outline" size="lg">
            Back
          </button>
          <button scButton scStepperNext size="lg">Continue</button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SimpleStepperDemo {
  readonly selectedIndex = signal(0);
  readonly steps = [
    'Step 1 of 4: get started.',
    'Step 2 of 4: add the details.',
    'Step 3 of 4: check everything.',
    'Step 4 of 4: all done.',
  ];
}`;
}
