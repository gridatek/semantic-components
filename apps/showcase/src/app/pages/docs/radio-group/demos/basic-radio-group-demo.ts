import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

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
          <span class="text-sm leading-none font-medium">Default</span>
        </label>
        <label scRadioField class="items-center">
          <input
            type="radio"
            scRadio
            value="comfortable"
            [formField]="spacingForm.spacing"
            id="r2"
          />
          <span class="text-sm leading-none font-medium">Comfortable</span>
        </label>
        <label scRadioField class="items-center">
          <input
            type="radio"
            scRadio
            value="compact"
            [formField]="spacingForm.spacing"
            id="r3"
          />
          <span class="text-sm leading-none font-medium">Compact</span>
        </label>
      </div>
      <p class="text-muted-foreground text-sm">
        Selected: {{ formModel().spacing || 'none' }}
      </p>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicRadioGroupDemo {
  readonly formModel = signal<SpacingFormModel>({
    spacing: 'comfortable',
  });

  readonly spacingForm = form(this.formModel);
}
