import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { StepperUsageDemo } from './stepper-usage-demo';

@Component({
  selector: 'app-stepper-usage-demo-container',
  imports: [UsageCode, StepperUsageDemo],
  template: `
    <app-usage-code [code]="code" demoUrl="/demos/stepper/stepper-usage-demo">
      <ng-template><app-stepper-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StepperUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScStepper,
  ScStepperConnector,
  ScStepperDescription,
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

/** Three steps across, each a tab — its indicator (a check once done), title and description; a connector to the next, filled once done; Back and Continue, or the steps themselves. */
@Component({
  selector: 'app-stepper-usage-demo',
  imports: [
    ScFrame,
    ScStepper,
    ScStepperConnector,
    ScStepperDescription,
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
  template: \`
    <div scFrame class="w-full max-w-2xl p-6">
      <div
        scStepper
        [(selectedIndex)]="step"
      >
        <div scStepperList aria-label="Sign-up steps">
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
                <span scStepperTitle>{{ s.title }}</span>
                <span scStepperDescription class="max-sm:sr-only">{{
                  s.description
                }}</span>
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StepperUsageDemo {
  private readonly step = signal(0);
  private readonly steps = [
    {
      title: 'Account',
      description: 'Your email and password',
      content: 'Step 1: choose the email you sign in with, and a password.'
    },
    {
      title: 'Profile',
      description: 'You and your team',
      content: 'Step 2: your name, your role, and who you work with.'
    },
    {
      title: 'Plan',
      description: 'Free or Pro',
      content: 'Step 3: start free, or take Pro for the whole team.'
    }
  ];
}`;
}
