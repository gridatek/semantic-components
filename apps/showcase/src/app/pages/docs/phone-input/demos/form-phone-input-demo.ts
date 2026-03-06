import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-phone-input-demo',
  imports: [ScPhoneInput],
  template: `
    <div class="max-w-md space-y-4 rounded-lg border p-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Name</label>
        <input
          type="text"
          class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
          placeholder="John Doe"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">Phone Number</label>
        <sc-phone-input defaultCountry="US" />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">Email</label>
        <input
          type="email"
          class="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
          placeholder="john@example.com"
        />
      </div>
      <button
        class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium"
      >
        Submit
      </button>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneInputDemo {}
