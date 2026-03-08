import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ScRadio, ScRadioField, ScRadioGroup } from '@semantic-components/ui';

interface DisabledFormModel {
  individual: string;
}

@Component({
  selector: 'app-disabled-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-muted-foreground mb-2 text-xs">
          Individual item disabled:
        </p>
        <div scRadioGroup>
          <label scRadioField>
            <input
              type="radio"
              scRadio
              value="option1"
              [formField]="disabledForm.individual"
            />
            Option 1
          </label>
          <label scRadioField>
            <input type="radio" scRadio value="option2" disabled />
            Option 2 (disabled)
          </label>
          <label scRadioField>
            <input
              type="radio"
              scRadio
              value="option3"
              [formField]="disabledForm.individual"
            />
            Option 3
          </label>
        </div>
      </div>
      <div>
        <p class="text-muted-foreground mb-2 text-xs">Entire group disabled:</p>
        <div scRadioGroup disabled>
          <label scRadioField>
            <input type="radio" scRadio value="option1" />
            Option 1
          </label>
          <label scRadioField>
            <input type="radio" scRadio value="option2" />
            Option 2
          </label>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRadioGroupDemo {
  readonly formModel = signal<DisabledFormModel>({
    individual: 'option1',
  });

  readonly disabledForm = form(this.formModel);
}
