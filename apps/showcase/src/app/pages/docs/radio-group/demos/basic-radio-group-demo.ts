import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  ScRadioGroup,
  ScRadioField,
  ScRadio,
} from '@semantic-components/ui-lab';

interface SpacingFormModel {
  spacing: string;
}

@Component({
  selector: 'app-basic-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div sc-radio-group>
      <label sc-radio-field class="flex items-center space-x-2">
        <input
          type="radio"
          sc-radio
          value="default"
          [formField]="spacingForm.spacing"
          id="r1"
        />
        <span class="text-sm font-medium leading-none">Default</span>
      </label>
      <label sc-radio-field class="flex items-center space-x-2">
        <input
          type="radio"
          sc-radio
          value="comfortable"
          [formField]="spacingForm.spacing"
          id="r2"
        />
        <span class="text-sm font-medium leading-none">Comfortable</span>
      </label>
      <label sc-radio-field class="flex items-center space-x-2">
        <input
          type="radio"
          sc-radio
          value="compact"
          [formField]="spacingForm.spacing"
          id="r3"
        />
        <span class="text-sm font-medium leading-none">Compact</span>
      </label>
    </div>
    <p class="mt-2 text-sm text-muted-foreground">
      Selected: {{ formModel().spacing || 'none' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRadioGroupDemo {
  readonly formModel = signal<SpacingFormModel>({
    spacing: 'comfortable',
  });

  readonly spacingForm = form(this.formModel);
}
