import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormSegmentedControlDemo } from './form-segmented-control-demo';

@Component({
  selector: 'app-form-segmented-control-demo-container',
  imports: [DemoContainer, FormSegmentedControlDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/segmented-control/form-segmented-control-demo"
    >
      <app-form-segmented-control-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSegmentedControlDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldErrors,
  ScLabel,
  ScSegmentedControl,
  ScSegmentedControlIndicator,
  ScSegmentedControlItem,
} from '@semantic-components/ui';

/** A [formField]: required, from the schema — nothing checked at first. */
@Component({
  selector: 'app-form-segmented-control-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldErrors,
    ScLabel,
    ScSegmentedControl,
    ScSegmentedControlIndicator,
    ScSegmentedControlItem,
  ],
  template: \`
    <form [formRoot]="settingsForm" class="grid justify-items-start gap-3">
      <div scField>
        <label scLabel>Density</label>
        <div scSegmentedControl [formField]="settingsForm.density">
          <div scSegmentedControlIndicator></div>
          @for (item of densities; track item.value) {
            <button scSegmentedControlItem [value]="item.value">
              {{ item.label }}
            </button>
          }
        </div>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit">Save</button>
      @if (saved()) {
        <p class="text-sm" role="status">{{ saved() }}</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormSegmentedControlDemo {
  private readonly model = signal<{ density: string | null }>({
    density: null,
  });
  private readonly saved = signal('');
  private readonly settingsForm = form(
    this.model,
    (s) => {
      required(s.density, { message: 'Choose a density.' });
    },
    {
      submission: {
        action: async () => this.saved.set(\`Saved: \${this.model().density}.\`),
      },
    },
  );
  private readonly densities = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'spacious', label: 'Spacious' },
  ];
}`;
}
