import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScTextarea,
} from '@semantic-components/ui';
import {
  ScStepper,
  ScStepperContent,
  ScStepperDescription,
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
  selector: 'app-horizontal-stepper-demo',
  imports: [
    ScStepper,
    ScStepperList,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperContent,
    ScStepperPanel,
    ScStepperTitle,
    ScStepperDescription,
    ScStepperPrevious,
    ScStepperNext,
    SiCheckIcon,
    ScButton,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScTextarea,
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
            <div class="flex flex-col">
              <span scStepperTitle>Account</span>
              <span scStepperDescription>Create your account</span>
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
              <span scStepperTitle>Profile</span>
              <span scStepperDescription>Set up your profile</span>
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
              <span scStepperTitle>Complete</span>
              <span scStepperDescription>Review and submit</span>
            </div>
          </div>
        </div>

        <div scStepperPanel [step]="0">
          <div scFieldGroup>
            <div scField>
              <label scLabel>Email</label>
              <input scInput type="email" placeholder="Enter your email" />
            </div>
            <div scField>
              <label scLabel>Password</label>
              <input scInput type="password" placeholder="Create a password" />
            </div>
          </div>
        </div>

        <div scStepperPanel [step]="1">
          <div scFieldGroup>
            <div scField>
              <label scLabel>Full Name</label>
              <input scInput type="text" placeholder="Enter your name" />
            </div>
            <div scField>
              <label scLabel>Bio</label>
              <textarea
                scTextarea
                placeholder="Tell us about yourself"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div scStepperPanel [step]="2">
          <ng-template scStepperContent>
            <div scFieldGroup>
              <p class="text-muted-foreground text-sm">
                Review your information and click submit to complete
                registration.
              </p>
              <div class="bg-muted rounded-lg p-4">
                <p class="text-sm">All steps completed! Ready to submit.</p>
              </div>
            </div>
          </ng-template>
        </div>

        <div class="mt-6 flex justify-between">
          <button scButton scStepperPrevious variant="outline" size="lg">
            Previous
          </button>
          <button scButton scStepperNext size="lg">
            {{ activeStep() === 2 ? 'Submit' : 'Next' }}
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalStepperDemo {
  readonly activeStep = signal(0);
}
