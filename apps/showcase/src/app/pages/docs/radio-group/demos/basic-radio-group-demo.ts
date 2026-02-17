import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { ScRadioGroup, ScRadioField, ScRadio } from '@semantic-components/ui';

interface SpacingFormModel {
  spacing: string;
}

@Component({
  selector: 'app-basic-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div class="flex flex-col gap-4">
      <div scRadioGroup>
        <label scRadioField class="items-center">
          <input
            type="radio"
            scRadio
            value="default"
            [formField]="spacingForm.spacing"
            id="r1"
          />
          <span class="text-sm font-medium leading-none">Default</span>
        </label>
        <label scRadioField class="items-center">
          <input
            type="radio"
            scRadio
            value="comfortable"
            [formField]="spacingForm.spacing"
            id="r2"
          />
          <span class="text-sm font-medium leading-none">Comfortable</span>
        </label>
        <label scRadioField class="items-center">
          <input
            type="radio"
            scRadio
            value="compact"
            [formField]="spacingForm.spacing"
            id="r3"
          />
          <span class="text-sm font-medium leading-none">Compact</span>
        </label>
      </div>
      <p class="text-sm text-muted-foreground">
        Selected: {{ formModel().spacing || 'none' }}
      </p>
    </div>
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
