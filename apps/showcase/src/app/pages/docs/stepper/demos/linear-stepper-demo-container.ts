import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinearStepperDemo } from './linear-stepper-demo';

@Component({
  selector: 'app-linear-stepper-demo-container',
  imports: [DemoContainer, LinearStepperDemo],
  template: `
    <app-demo-container
      title="Linear with Validation"
      demoUrl="/demos/stepper/linear-stepper-demo"
      [code]="code"
    >
      <app-linear-stepper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinearStepperDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
} from '@angular/forms/signals';
import { ScButton, ScField, ScFieldErrors, ScInput, ScLabel, ScStepper, ScStepperIndicator, ScStepperItem, ScStepperList, ScStepperNext, ScStepperPanel, ScStepperPrevious, ScStepperSeparator, ScStepperTitle, ScStepperTrigger } from '@semantic-components/ui';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

interface SignupModel {
  account: { email: string };
  profile: { name: string };
}

@Component({
  selector: 'app-linear-stepper-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldErrors,
    ScInput,
    ScLabel,
    ScStepper,
    ScStepperIndicator,
    ScStepperItem,
    ScStepperList,
    ScStepperNext,
    ScStepperPanel,
    ScStepperPrevious,
    ScStepperSeparator,
    ScStepperTitle,
    ScStepperTrigger,
    SiCheckIcon,
    SiXIcon,
  ],
  template: \`
    <form [formRoot]="signupForm" class="w-full max-w-xl rounded-lg border p-6">
      <div
        scStepper
        linear
        [(selectedIndex)]="selectedIndex"
        #stepper="scStepper"
      >
        <div scStepperList>
          <div
            scStepperItem
            [stepControl]="signupForm.account"
            #account="scStepperItem"
          >
            <button scStepperTrigger>
              <span scStepperIndicator>
                @switch (account.status()) {
                  @case ('complete') {
                    <svg siCheckIcon></svg>
                  }
                  @case ('error') {
                    <svg siXIcon></svg>
                  }
                  @default {
                    1
                  }
                }
              </span>
              <span scStepperTitle>Account</span>
            </button>
          </div>
          <div scStepperSeparator [step]="0"></div>
          <div
            scStepperItem
            [stepControl]="signupForm.profile"
            #profile="scStepperItem"
          >
            <button scStepperTrigger>
              <span scStepperIndicator>
                @switch (profile.status()) {
                  @case ('complete') {
                    <svg siCheckIcon></svg>
                  }
                  @case ('error') {
                    <svg siXIcon></svg>
                  }
                  @default {
                    2
                  }
                }
              </span>
              <span scStepperTitle>Profile</span>
            </button>
          </div>
          <div scStepperSeparator [step]="1"></div>
          <div scStepperItem #review="scStepperItem">
            <button scStepperTrigger>
              <span scStepperIndicator>3</span>
              <span scStepperTitle>Review</span>
            </button>
          </div>
        </div>

        <div scStepperPanel [step]="0">
          <div scField>
            <label scLabel>Email</label>
            <input
              scInput
              type="email"
              [formField]="signupForm.account.email"
              placeholder="you@example.com"
            />
            <div scFieldErrors></div>
          </div>
        </div>
        <div scStepperPanel [step]="1">
          <div scField>
            <label scLabel>Full name</label>
            <input
              scInput
              [formField]="signupForm.profile.name"
              placeholder="Ada Lovelace"
            />
            <div scFieldErrors></div>
          </div>
        </div>
        <div scStepperPanel [step]="2">
          @if (created()) {
            <p class="text-sm" role="status">
              Account created for {{ model().profile.name }}.
            </p>
          } @else {
            <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt class="text-muted-foreground">Email</dt>
              <dd>{{ model().account.email }}</dd>
              <dt class="text-muted-foreground">Name</dt>
              <dd>{{ model().profile.name }}</dd>
            </dl>
          }
        </div>

        <div class="mt-6 flex justify-between">
          <button scStepperPrevious>Back</button>
          @if (stepper.isLastStep()) {
            <button
              scButton
              type="button"
              [disabled]="created()"
              (click)="created.set(true)"
            >
              Create account
            </button>
          } @else {
            <button scStepperNext>Next</button>
          }
        </div>
      </div>
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinearStepperDemo {
  readonly selectedIndex = signal(0);
  readonly created = signal(false);

  readonly model = signal<SignupModel>({
    account: { email: '' },
    profile: { name: '' },
  });

  readonly signupForm = form(this.model, (s) => {
    required(s.account.email, { message: 'Email is required' });
    email(s.account.email, { message: 'Enter a valid email' });
    required(s.profile.name, { message: 'Name is required' });
  });
}`;
}
