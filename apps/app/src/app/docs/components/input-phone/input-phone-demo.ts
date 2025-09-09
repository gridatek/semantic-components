import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScInputPhone } from '@semantic-components/ui';

@Component({
  selector: 'app-input-phone-demo',
  imports: [ScInputPhone],
  template: `
    <div class="space-y-6">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic phone input</h3>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="phone1">Phone Number</label>
          <input class="max-w-sm" id="phone1" [(value)]="phoneNumber1" sc-input-phone />
        </div>
        <p class="text-sm text-muted-foreground">Value: {{ phoneNumber1() || 'Empty' }}</p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With custom placeholder</h3>
        <div class="space-y-2">
          <label class="text-sm font-medium" for="phone2">Mobile Number</label>
          <input
            class="max-w-sm"
            id="phone2"
            [(value)]="phoneNumber2"
            sc-input-phone
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <p class="text-sm text-muted-foreground">Value: {{ phoneNumber2() || 'Empty' }}</p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Different sizes</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium" for="phone3">Small</label>
            <input
              class="h-8 px-2 text-sm max-w-xs"
              id="phone3"
              [(value)]="phoneNumber3"
              sc-input-phone
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="phone4">Default</label>
            <input class="max-w-sm" id="phone4" [(value)]="phoneNumber4" sc-input-phone />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" for="phone5">Large</label>
            <input
              class="h-12 px-4 text-lg max-w-md"
              id="phone5"
              [(value)]="phoneNumber5"
              sc-input-phone
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Features</h3>
        <ul class="text-sm text-muted-foreground space-y-1">
          <li>
            • Automatically sets
            <code>type="tel"</code>
            for optimal mobile keyboards
          </li>
          <li>
            • Uses
            <code>inputmode="tel"</code>
            to trigger numeric keypad on mobile
          </li>
          <li>
            • Includes
            <code>autocomplete="tel"</code>
            for browser autofill
          </li>
          <li>• Inherits all styling and functionality from ScInput</li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneDemo {
  readonly phoneNumber1 = signal('');
  readonly phoneNumber2 = signal('');
  readonly phoneNumber3 = signal('');
  readonly phoneNumber4 = signal('');
  readonly phoneNumber5 = signal('');
}
