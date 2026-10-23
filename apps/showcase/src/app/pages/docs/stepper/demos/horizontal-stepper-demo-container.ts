import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { HorizontalStepperDemo } from './horizontal-stepper-demo';

@Component({
  selector: 'app-horizontal-stepper-demo-container',
  imports: [DemoContainer, HorizontalStepperDemo],
  template: `
    <app-demo-container title="Horizontal Stepper" [code]="code">
      <app-horizontal-stepper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalStepperDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScField, ScFieldGroup, ScInput, ScLabel, ScTextarea, ScStepper, ScStepperDescription, ScStepperIndicator, ScStepperItem, ScStepperList, ScStepperNext, ScStepperPanel, ScStepperPrevious, ScStepperSeparator, ScStepperTitle, ScStepperTrigger } from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-horizontal-stepper-demo',
  imports: [
    FormField,
    ScStepper,
    ScStepperList,
    ScStepperIndicator,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperPanel,
    ScStepperTitle,
    ScStepperDescription,
    ScStepperPrevious,
    ScStepperNext,
    SiCheckIcon,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScTextarea,
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
            <div class="flex flex-col">
              <span scStepperTitle>Account</span>
              <span scStepperDescription>Create your account</span>
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
              <span scStepperTitle>Profile</span>
              <span scStepperDescription>Set up your profile</span>
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
              <span scStepperTitle>Complete</span>
              <span scStepperDescription>Review and submit</span>
            </div>
          </div>
        </div>

        <div scStepperPanel [step]="0">
          <div scFieldGroup>
            <div scField>
              <label scLabel>Email</label>
              <input
                scInput
                type="email"
                [formField]="signupForm.email"
                placeholder="Enter your email"
              />
            </div>
            <div scField>
              <label scLabel>Password</label>
              <input
                scInput
                type="password"
                [formField]="signupForm.password"
                placeholder="Create a password"
              />
            </div>
          </div>
        </div>

        <div scStepperPanel [step]="1">
          <div scFieldGroup>
            <div scField>
              <label scLabel>Full Name</label>
              <input
                scInput
                type="text"
                [formField]="signupForm.name"
                placeholder="Enter your name"
              />
            </div>
            <div scField>
              <label scLabel>Bio</label>
              <textarea
                scTextarea
                [formField]="signupForm.bio"
                placeholder="Tell us about yourself"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div scStepperPanel [step]="2">
          <div scFieldGroup>
            <p class="text-muted-foreground text-sm">
              Review your information and click submit to complete registration.
            </p>
            <dl
              class="bg-muted grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-lg p-4 text-sm"
            >
              <dt class="text-muted-foreground">Email</dt>
              <dd>{{ model().email }}</dd>
              <dt class="text-muted-foreground">Name</dt>
              <dd>{{ model().name }}</dd>
              <dt class="text-muted-foreground">Bio</dt>
              <dd>{{ model().bio }}</dd>
            </dl>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button scStepperPrevious>Previous</button>
          <button scStepperNext>
            {{ selectedIndex() === 2 ? 'Submit' : 'Next' }}
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalStepperDemo {
  readonly selectedIndex = signal(0);

  readonly model = signal({ email: '', password: '', name: '', bio: '' });
  readonly signupForm = form(this.model);
}`;
}
