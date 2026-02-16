import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormMultiSelectDemo } from './form-multi-select-demo';

@Component({
  selector: 'app-form-multi-select-demo-container',
  imports: [DemoContainer, FormMultiSelectDemo],
  template: `
    <app-demo-container title="Form" [code]="code">
      <app-form-multi-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMultiSelectDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScMultiSelect, MultiSelectOption } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-form-multi-select-demo',
  imports: [ScMultiSelect],
  template: \`
    <div class="max-w-md rounded-lg border p-4 space-y-4">
      <div class="space-y-2">
        <label class="text-sm font-medium">Name</label>
        <input
          type="text"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Your name"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">Interests</label>
        <sc-multi-select
          [(value)]="interestsValue"
          [options]="interestOptions"
          [showSelectAll]="true"
          placeholder="Select your interests..."
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium">Preferred Contact Methods</label>
        <sc-multi-select
          [options]="contactOptions"
          [searchable]="false"
          placeholder="How can we reach you?"
        />
      </div>
      <button
        class="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Save Preferences
      </button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormMultiSelectDemo {
  readonly interestsValue = signal<string[]>([]);

  readonly interestOptions: MultiSelectOption[] = [
    { value: 'tech', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'movies', label: 'Movies' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'reading', label: 'Reading' },
  ];

  readonly contactOptions: MultiSelectOption[] = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notifications' },
  ];
}`;
}
