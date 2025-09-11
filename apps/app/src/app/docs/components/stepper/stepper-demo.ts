import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScStep, ScStepper } from '@semantic-components/ui';

@Component({
  selector: 'app-stepper-demo',
  imports: [ScStepper, ScStep],
  template: `
    <div class="w-full max-w-4xl">
      <sc-stepper (stepCompleteEvent)="onStepComplete()">
        <sc-step label="Account Setup">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold leading-none tracking-tight">Create your account</h3>
            <p class="text-sm text-muted-foreground">
              Let's start by setting up your account information.
            </p>
            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full Name
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Address
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        </sc-step>

        <sc-step label="Profile Details">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold leading-none tracking-tight">Complete your profile</h3>
            <p class="text-sm text-muted-foreground">
              Add more details to help us personalize your experience.
            </p>
            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Company
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Your company name"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Role
                </label>
                <select
                  class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select your role</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </sc-step>

        <sc-step label="Preferences">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold leading-none tracking-tight">Set your preferences</h3>
            <p class="text-sm text-muted-foreground">
              Configure your account settings and notifications.
            </p>
            <div class="space-y-6">
              <div>
                <h4 class="text-sm font-medium leading-none mb-3">Notifications</h4>
                <div class="space-y-3">
                  <div class="flex items-center space-x-2">
                    <input
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      id="email-notifications"
                      type="checkbox"
                      checked
                    />
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="email-notifications"
                    >
                      Email notifications
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      id="sms-notifications"
                      type="checkbox"
                    />
                    <label
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      for="sms-notifications"
                    >
                      SMS notifications
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-medium leading-none mb-3">Privacy</h4>
                <div class="flex items-center space-x-2">
                  <input
                    class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    id="public-profile"
                    type="checkbox"
                  />
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="public-profile"
                  >
                    Make profile public
                  </label>
                </div>
              </div>
            </div>
          </div>
        </sc-step>

        <sc-step label="Review">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold leading-none tracking-tight">
              Review your information
            </h3>
            <p class="text-sm text-muted-foreground">
              Please review all the information you previously entered and confirm.
            </p>
            <div class="rounded-lg bg-muted/50 p-4 space-y-3">
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
