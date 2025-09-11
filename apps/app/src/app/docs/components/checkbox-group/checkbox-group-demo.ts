import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
  ScCheckbox,
  ScCheckboxGroup,
  ScCheckboxItem,
  ScField,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-checkbox-group-demo',
  imports: [ScCheckboxGroup, ScCheckboxItem, ReactiveFormsModule, ScCheckbox, ScLabel, ScField],
  template: `
    <form [formGroup]="toppingsForm">
      <div sc-field>
        <label sc-label>Toppings</label>
        <sc-checkbox-group formControlName="toppings">
          @for (topping of toppingsArray; track topping) {
            <label sc-checkbox-item>
              <input [value]="topping" sc-checkbox />
              {{ topping }}
            </label>
          }
        </sc-checkbox-group>
      </div>
    </form>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupDemo {
  protected readonly toppingsArray = ['Extra Cheese', 'Mushrooms', 'Pepperoni', 'Sausage'];

  protected readonly toppingsForm = new FormGroup({
    toppings: new FormControl([]),
  });
}
