import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledRadioGroupDemo } from './disabled-radio-group-demo';

@Component({
  selector: 'app-disabled-radio-group-demo-container',
  imports: [DemoContainer, DisabledRadioGroupDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-radio-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRadioGroupDemoContainer {
  readonly code = `import {
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
  template: \`
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-muted-foreground mb-2 text-xs">
          Individual item disabled:
        </p>
        <div scRadioGroup>
          <label scRadioField class="flex items-center space-x-2">
            <input
              type="radio"
              scRadio
              value="option1"
              [formField]="disabledForm.individual"
              id="d1"
            />
            <span class="text-sm">Option 1</span>
          </label>
          <label scRadioField class="flex items-center space-x-2">
            <input type="radio" scRadio value="option2" id="d2" disabled />
            <span class="text-sm opacity-50">Option 2 (disabled)</span>
          </label>
          <label scRadioField class="flex items-center space-x-2">
            <input
              type="radio"
              scRadio
              value="option3"
              [formField]="disabledForm.individual"
              id="d3"
            />
            <span class="text-sm">Option 3</span>
          </label>
        </div>
      </div>
      <div>
        <p class="text-muted-foreground mb-2 text-xs">Entire group disabled:</p>
        <div scRadioGroup>
          <label scRadioField class="flex items-center space-x-2">
            <input type="radio" scRadio value="option1" disabled id="g1" />
            <span class="text-sm opacity-50">Option 1</span>
          </label>
          <label scRadioField class="flex items-center space-x-2">
            <input type="radio" scRadio value="option2" disabled id="g2" />
            <span class="text-sm opacity-50">Option 2</span>
          </label>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledRadioGroupDemo {
  readonly formModel = signal<DisabledFormModel>({
    individual: 'option1',
  });

  readonly disabledForm = form(this.formModel);
}`;
}
