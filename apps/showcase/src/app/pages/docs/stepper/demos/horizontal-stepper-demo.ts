import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScStepper,
  ScStepperList,
  ScStepperItem,
  ScStepperTrigger,
  ScStepperSeparator,
  ScStepperContent,
  ScStepperTitle,
  ScStepperDescription,
  ScStepperPrevious,
  ScStepperNext,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-horizontal-stepper-demo',
  imports: [
    ScStepper,
    ScStepperList,
    ScStepperItem,
    ScStepperTrigger,
    ScStepperSeparator,
    ScStepperContent,
    ScStepperTitle,
    ScStepperDescription,
    ScStepperPrevious,
    ScStepperNext,
  ],
  template: `
    <div class="rounded-lg border p-6">
      <div sc-stepper [(activeStep)]="activeStep">
        <div sc-stepper-list>
          <div sc-stepper-item [step]="0">
            <button sc-stepper-trigger></button>
            <div class="flex flex-col">
              <span sc-stepper-title>Account</span>
              <span sc-stepper-description>Create your account</span>
            </div>
          </div>
          <div sc-stepper-separator></div>
          <div sc-stepper-item [step]="1">
            <button sc-stepper-trigger></button>
            <div class="flex flex-col">
              <span sc-stepper-title>Profile</span>
              <span sc-stepper-description>Set up your profile</span>
            </div>
          </div>
          <div sc-stepper-separator></div>
          <div sc-stepper-item [step]="2">
            <button sc-stepper-trigger></button>
            <div class="flex flex-col">
              <span sc-stepper-title>Complete</span>
              <span sc-stepper-description>Review and submit</span>
            </div>
          </div>
        </div>

        <div sc-stepper-content [step]="0">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div sc-stepper-content [step]="1">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Bio</label>
              <textarea
                placeholder="Tell us about yourself"
                rows="3"
                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        <div sc-stepper-content [step]="2">
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              Review your information and click submit to complete registration.
            </p>
            <div class="rounded-lg bg-muted p-4">
              <p class="text-sm">All steps completed! Ready to submit.</p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button sc-stepper-previous>Previous</button>
          <button sc-stepper-next>
            {{ activeStep() === 2 ? 'Submit' : 'Next' }}
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalStepperDemo {
  readonly activeStep = signal(0);
}
