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

interface DisabledFormModel {
  individual: string;
}

@Component({
  selector: 'app-disabled-radio-group-demo',
  imports: [ScRadioGroup, ScRadioField, ScRadio, FormField],
  template: `
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-xs text-muted-foreground mb-2">
          Individual item disabled:
        </p>
        <div sc-radio-group>
          <label sc-radio-field class="flex items-center space-x-2">
            <input
              type="radio"
              sc-radio
              value="option1"
              [formField]="disabledForm.individual"
              id="d1"
            />
            <span class="text-sm">Option 1</span>
          </label>
          <label sc-radio-field class="flex items-center space-x-2">
            <input type="radio" sc-radio value="option2" id="d2" disabled />
            <span class="text-sm opacity-50">Option 2 (disabled)</span>
          </label>
          <label sc-radio-field class="flex items-center space-x-2">
            <input
              type="radio"
              sc-radio
              value="option3"
              [formField]="disabledForm.individual"
              id="d3"
            />
            <span class="text-sm">Option 3</span>
          </label>
        </div>
      </div>
      <div>
        <p class="text-xs text-muted-foreground mb-2">Entire group disabled:</p>
        <div sc-radio-group>
          <label sc-radio-field class="flex items-center space-x-2">
            <input type="radio" sc-radio value="option1" disabled id="g1" />
            <span class="text-sm opacity-50">Option 1</span>
          </label>
          <label sc-radio-field class="flex items-center space-x-2">
            <input type="radio" sc-radio value="option2" disabled id="g2" />
            <span class="text-sm opacity-50">Option 2</span>
          </label>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRadioGroupDemo {
  readonly formModel = signal<DisabledFormModel>({
    individual: 'option1',
  });

  readonly disabledForm = form(this.formModel);
}
