import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormPhoneInputDemo } from './form-phone-input-demo';

@Component({
  selector: 'app-form-phone-input-demo-container',
  imports: [DemoContainer, FormPhoneInputDemo],
  template: `
    <app-demo-container title="Contact Form" [code]="code">
      <app-form-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInput } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-phone-input-demo',
  imports: [ScPhoneInput],
  template: \`
    <div class="max-w-md space-y-4 rounded-lg border p-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Name</label>
        <input
          type="text"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="john@example.com"
        />
      </div>
      <button
        class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Submit
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneInputDemo {}`;
}
