import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { StepperDemo } from './stepper-demo';

@Component({
  selector: 'app-stepper-demo-section',
  imports: [PreviewCodeTabs, StepperDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-stepper-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScStepper, ScStep } from '@semantic-components/ui';

@Component({
  selector: 'app-stepper-demo',
  imports: [ScStepper, ScStep],
  template: \`
    <div class="w-full max-w-4xl">
      <sc-stepper (stepCompleteEvent)="onStepComplete()">
        <sc-step label="Account Setup">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Create your account</h3>
            <p class="text-gray-600">
              Let's start by setting up your account information.
            </p>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>
        </sc-step>

        <sc-step label="Profile Details">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Complete your profile</h3>
            <p class="text-gray-600">
              Add more details to help us personalize your experience.
            </p>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
            <h3 class="text-lg font-medium">Set your preferences</h3>
            <p class="text-gray-600">
              Configure your account settings and notifications.
            </p>
            <div class="space-y-4">
              <div>
                <h4 class="font-medium text-gray-900">Notifications</h4>
                <div class="mt-2 space-y-2">
                  <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked />
                    <span class="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span class="ml-2 text-sm text-gray-700">SMS notifications</span>
                  </label>
                </div>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Privacy</h4>
                <div class="mt-2">
                  <label class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span class="ml-2 text-sm text-gray-700">Make profile public</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </sc-step>

        <sc-step label="Review">
          <div class="space-y-4">
            <h3 class="text-lg font-medium">Review your information</h3>
            <p class="text-gray-600">
              Please review all the information you previously entered and confirm.
            </p>
            <div class="bg-gray-50 p-4 rounded-lg space-y-3">
              <div class="text-sm">
                <span class="font-medium">Account:</span> Setup complete
              </div>
              <div class="text-sm">
                <span class="font-medium">Profile:</span> Details added
              </div>
              <div class="text-sm">
                <span class="font-medium">Preferences:</span> Configured
              </div>
            </div>
            <div class="flex items-center p-3 bg-green-50 text-green-700 rounded-lg">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              All steps completed successfully!
            </div>
          </div>
        </sc-step>
      </sc-stepper>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperDemo {
  onStepComplete(): void {
    console.log('Stepper workflow completed!');
    // Handle completion logic here
  }
}`;
}
