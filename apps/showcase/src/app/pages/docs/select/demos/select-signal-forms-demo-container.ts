import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SelectSignalFormsDemo } from './select-signal-forms-demo';

@Component({
  selector: 'app-select-signal-forms-demo-container',
  imports: [DemoContainer, SelectSignalFormsDemo],
  template: `
    <app-demo-container
      title="Signal Forms"
      demoUrl="/demos/select/select-signal-forms-demo"
      [code]="code"
    >
      <app-select-signal-forms-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSignalFormsDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScSelect,
  ScSelectDisplayValue,
  ScSelectIcon,
  ScSelectInput,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemLabel,
  ScSelectList,
  ScSelectOrigin,
  ScSelectPopup,
  ScSelectPortal,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface FormModel {
  fruit: string;
}

@Component({
  selector: 'app-select-signal-forms-demo',
  imports: [
    ScField,
    ScLabel,
    ScSelect,
    ScSelectDisplayValue,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectOrigin,
    ScSelectInput,
    ScSelectIcon,
    ScSelectItemIndicator,
    ScSelectItemLabel,
    SiChevronDownIcon,
    SiCheckIcon,
    JsonPipe,
    FormField,
    FormRoot,
  ],
  template: \`
    <form [formRoot]="fruitForm" class="w-full max-w-sm space-y-6">
      <div class="space-y-4">
        <div scField>
          <label scLabel>Fruit</label>
          <div scSelect class="w-full">
            <div scSelectOrigin>
              <span scSelectDisplayValue></span>
              <input
                scSelectInput
                [formField]="fruitForm.fruit"
                placeholder="Select a fruit"
                aria-label="Fruit dropdown"
              />
              <svg scSelectIcon siChevronDownIcon></svg>
            </div>
            <ng-template scSelectPortal>
              <div scSelectPopup>
                <div scSelectList>
                  @for (fruit of fruits; track fruit) {
                    <div scSelectItem [value]="fruit" [label]="fruit">
                      <span scSelectItemLabel>{{ fruit }}</span>
                      <svg scSelectItemIndicator siCheckIcon></svg>
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <div class="bg-muted rounded-md p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSignalFormsDemo {
  readonly fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'];

  readonly formModel = signal<FormModel>({
    fruit: '',
  });

  readonly fruitForm = form(this.formModel, (schemaPath) => {
    required(schemaPath.fruit);
  });
}`;
}
