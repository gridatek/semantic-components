import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalStepperDemo } from './vertical-stepper-demo';

@Component({
  selector: 'app-vertical-stepper-demo-container',
  imports: [DemoContainer, VerticalStepperDemo],
  template: `
    <app-demo-container
      title="Vertical"
      [code]="code"
      demoUrl="/demos/stepper/vertical-stepper-demo"
    >
      <app-vertical-stepper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalStepperDemoContainer {
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

/** Down the side: the connectors run under the indicators, ↑ and ↓ move between steps; the panels beside the list (the root a row from sm). */
@Component({
  selector: 'app-vertical-stepper-demo',
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
        orientation="vertical"
        [(selectedIndex)]="step"
        class="sm:flex-row sm:gap-8"
      >
        <div scStepperList aria-label="Sign-up steps" class="shrink-0">
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
                <span scStepperDescription>{{ s.description }}</span>
              </button>
              <div scStepperConnector></div>
            </div>
          }
        </div>
        <div class="flex flex-1 flex-col justify-between gap-6">
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
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalStepperDemo {
  private readonly step = signal(0);
  private readonly steps = [
    {
      title: 'Account',
      description: 'Your email and password',
      content: 'Step 1: choose the email you sign in with, and a password.',
    },
    {
      title: 'Profile',
      description: 'You and your team',
      content: 'Step 2: your name, your role, and who you work with.',
    },
    {
      title: 'Plan',
      description: 'Free or Pro',
      content: 'Step 3: start free, or take Pro for the whole team.',
    },
  ];
}`;
}
