import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScRadio,
  ScRadioField,
  ScRadioGroup,
} from '@semantic-components/ui';

interface SpacingFormModel {
  spacing: string;
}

@Component({
  selector: 'app-basic-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, ScLabel, FormField],
  template: `
    <div class="w-64 space-y-4">
      <div scRadioGroup>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="default"
            [formField]="spacingForm.spacing"
          />
          <label scLabel>Default</label>
        </label>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="comfortable"
            [formField]="spacingForm.spacing"
          />
          <label scLabel>Comfortable</label>
        </label>
        <label scRadioField>
          <input
            type="radio"
            scRadio
            value="compact"
            [formField]="spacingForm.spacing"
          />
          <label scLabel>Compact</label>
        </label>
      </div>
      <div class="bg-muted w-full rounded-md p-4">
        <p class="text-sm font-medium">Selected:</p>
        <pre class="mt-2 text-xs">{{ formModel().spacing || 'none' }}</pre>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRadioGroupDemo {
  readonly formModel = signal<SpacingFormModel>({
    spacing: 'comfortable',
  });

  readonly spacingForm = form(this.formModel);
}
