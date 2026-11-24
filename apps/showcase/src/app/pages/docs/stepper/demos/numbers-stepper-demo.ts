import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScStepper,
  ScStepperConnector,
  ScStepperIndicator,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPanel,
  ScStepperPrevious,
  ScStepperTitle,
  ScStepperTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** Numbers only: the titles read by screen readers (sr-only), still naming the tabs. */
@Component({
  selector: 'app-numbers-stepper-demo',
  imports: [
    ScFrame,
    ScStepper,
    ScStepperConnector,
    ScStepperIndicator,
    ScStepperItem,
    ScStepperList,
    ScStepperNext,
    ScStepperPanel,
    ScStepperPrevious,
    ScStepperTitle,
    ScStepperTrigger,
    SiCheckIcon,
  ],
  template: `
    <div scFrame class="w-full max-w-md p-6">
      <div scStepper [(selectedIndex)]="step">
        <div scStepperList aria-label="Checkout steps">
          @for (s of steps; track s.title) {
            <div scStepperItem #item="scStepperItem">
              <button scStepperTrigger>
                <span scStepperIndicator>
                  @if (item.status() === 'complete') {
                    <svg siCheckIcon></svg>
                  } @else {
                    {{ $index + 1 }}
                  }
                </span>
                <span scStepperTitle class="sr-only">{{ s.title }}</span>
              </button>
              <div scStepperConnector></div>
            </div>
          }
        </div>
        @for (s of steps; track s.title) {
          <div scStepperPanel [step]="$index">
            <p class="text-muted-foreground text-sm">{{ s.content }}</p>
          </div>
        }
        <div class="flex justify-between gap-2">
          <button scStepperPrevious>Back</button>
          <button scStepperNext>Continue</button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NumbersStepperDemo {
  private readonly step = signal(0);
  private readonly steps = [
    {
      title: 'Cart',
      content: 'Step 1 of 4: your cart.',
    },
    {
      title: 'Address',
      content: 'Step 2 of 4: where it goes.',
    },
    {
      title: 'Payment',
      content: 'Step 3 of 4: how you pay.',
    },
    {
      title: 'Confirm',
      content: 'Step 4 of 4: check and order.',
    },
  ];
}
