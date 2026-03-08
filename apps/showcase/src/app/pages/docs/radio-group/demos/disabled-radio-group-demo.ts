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

interface DisabledFormModel {
  individual: string;
}

@Component({
  selector: 'app-disabled-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, ScLabel, FormField],
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
            <label scLabel>Option 1</label>
          </label>
          <label scRadioField>
            <input type="radio" scRadio value="option2" disabled />
            <label scLabel>Option 2 (disabled)</label>
          </label>
          <label scRadioField>
            <input
              type="radio"
              scRadio
              value="option3"
              [formField]="disabledForm.individual"
            />
            <label scLabel>Option 3</label>
          </label>
        </div>
      </div>
      <div>
        <p class="text-muted-foreground mb-2 text-xs">Entire group disabled:</p>
        <div scRadioGroup>
          <label scRadioField>
            <input type="radio" scRadio value="option1" disabled />
            <label scLabel>Option 1</label>
          </label>
          <label scRadioField>
            <input type="radio" scRadio value="option2" disabled />
            <label scLabel>Option 2</label>
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
