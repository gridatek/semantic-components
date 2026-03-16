import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScStepper,
  ScStepperContent,
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
    SiCheckIcon,
  ],
  template: `
    <div class="w-full max-w-2xl rounded-lg border p-6">
      <div scStepper [(activeStep)]="activeStep">
        <div scStepperList>
          <div scStepperItem [step]="0">
            <button scStepperTrigger #t0="scStepperTrigger">
              @if (t0.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t0.stepperItem.step() + 1 }}</span>
              }
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Account</span>
              <span scStepperDescription>Create your account</span>
            </div>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="1">
            <button scStepperTrigger #t1="scStepperTrigger">
              @if (t1.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t1.stepperItem.step() + 1 }}</span>
              }
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Profile</span>
              <span scStepperDescription>Set up your profile</span>
            </div>
          </div>
          <div scStepperSeparator></div>
          <div scStepperItem [step]="2">
            <button scStepperTrigger #t2="scStepperTrigger">
              @if (t2.stepperItem.state() === 'complete') {
                <svg siCheckIcon class="size-4"></svg>
              } @else {
                <span>{{ t2.stepperItem.step() + 1 }}</span>
              }
            </button>
            <div class="flex flex-col">
              <span scStepperTitle>Complete</span>
              <span scStepperDescription>Review and submit</span>
            </div>
          </div>
        </div>

        <div scStepperContent [step]="0">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                class="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                class="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div scStepperContent [step]="1">
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                class="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Bio</label>
              <textarea
                placeholder="Tell us about yourself"
                rows="3"
                class="border-input bg-background flex w-full rounded-md border px-3 py-2 text-sm"
              ></textarea>
            </div>
          </div>
        </div>

        <div scStepperContent [step]="2">
          <div class="space-y-4">
            <p class="text-muted-foreground text-sm">
              Review your information and click submit to complete registration.
            </p>
            <div class="bg-muted rounded-lg p-4">
              <p class="text-sm">All steps completed! Ready to submit.</p>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-between">
          <button scStepperPrevious>Previous</button>
          <button scStepperNext>
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
