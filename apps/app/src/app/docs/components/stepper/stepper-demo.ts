import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScCheckbox,
  ScCheckboxField,
  ScField,
  ScHeading,
  ScInput,
  ScLabel,
  ScOption,
  ScSelect,
  ScStep,
  ScStepper,
} from '@semantic-components/ui';

@Component({
  selector: 'app-stepper-demo',
  imports: [
    ScStepper,
    ScStep,
    ScInput,
    ScLabel,
    ScSelect,
    ScCheckbox,
    ScHeading,
    ScOption,
    ScField,
    ScCheckboxField,
  ],
  template: `
    <div class="w-full max-w-4xl">
      <sc-stepper (stepCompleteEvent)="onStepComplete()">
        <sc-step label="Account Setup">
          <div class="space-y-4">
            <h3 sc-heading level="3">Create your account</h3>
            <p class="text-sm text-muted-foreground">
              Let's start by setting up your account information.
            </p>
            <div class="space-y-4">
              <sc-field>
                <label sc-label for="full-name">Full Name</label>
                <input id="full-name" sc-input type="text" placeholder="Enter your full name" />
              </sc-field>
              <sc-field>
                <label sc-label for="email">Email Address</label>
                <input id="email" sc-input type="email" placeholder="Enter your email" />
              </sc-field>
            </div>
          </div>
        </sc-step>

        <sc-step label="Profile Details">
          <div class="space-y-4">
            <h3 sc-heading level="3">Complete your profile</h3>
            <p class="text-sm text-muted-foreground">
              Add more details to help us personalize your experience.
            </p>
            <div class="space-y-4">
              <sc-field>
                <label sc-label for="company">Company</label>
                <input id="company" sc-input type="text" placeholder="Your company name" />
              </sc-field>
              <sc-field>
                <label sc-label for="role">Role</label>
                <sc-select id="role">
                  <sc-option value="">Select your role</sc-option>
                  <sc-option value="developer">Developer</sc-option>
                  <sc-option value="designer">Designer</sc-option>
                  <sc-option value="manager">Manager</sc-option>
                  <sc-option value="other">Other</sc-option>
                </sc-select>
              </sc-field>
            </div>
          </div>
        </sc-step>

        <sc-step label="Preferences">
          <div class="space-y-4">
            <h3 sc-heading level="3">Set your preferences</h3>
            <p class="text-sm text-muted-foreground">
              Configure your account settings and notifications.
            </p>
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium leading-none mb-3">Notifications</h4>
                <div class="space-y-3">
                  <sc-checkbox-field>
                    <input id="email-notifications" sc-checkbox type="checkbox" checked />
                    <label sc-label for="email-notifications">Email notifications</label>
                  </sc-checkbox-field>
                  <sc-checkbox-field>
                    <input id="sms-notifications" sc-checkbox type="checkbox" />
                    <label sc-label for="sms-notifications">SMS notifications</label>
                  </sc-checkbox-field>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium leading-none mb-3">Privacy</h4>
                <sc-checkbox-field>
                  <input id="public-profile" sc-checkbox type="checkbox" />
                  <label sc-label for="public-profile">Make profile public</label>
                </sc-checkbox-field>
              </div>
            </div>
          </div>
        </sc-step>

        <sc-step label="Review">
          <div class="space-y-4">
            <h3 sc-heading level="3">Review your information</h3>
            <p class="text-sm text-muted-foreground">
              Please review all the information you previously entered and confirm.
            </p>
            <div class="rounded-lg border bg-card p-4">
              <div class="space-y-3">
                <div class="text-sm">
                  <span class="font-medium">Account:</span>
                  <span class="text-muted-foreground ml-1">Setup complete</span>
                </div>
                <div class="text-sm">
                  <span class="font-medium">Profile:</span>
                  <span class="text-muted-foreground ml-1">Details added</span>
                </div>
                <div class="text-sm">
                  <span class="font-medium">Preferences:</span>
                  <span class="text-muted-foreground ml-1">Configured</span>
                </div>
              </div>
            </div>
            <div
              class="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
            >
              <svg class="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm font-medium">All steps completed successfully!</span>
            </div>
          </div>
        </sc-step>
      </sc-stepper>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemo {
  onStepComplete(): void {
    console.log('Stepper workflow completed!');
    // Handle completion logic here
  }
}
