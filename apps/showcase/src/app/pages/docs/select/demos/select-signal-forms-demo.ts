import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScSelect,
  ScSelectItem,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectLabel,
} from '@semantic-components/ui';

interface FormModel {
  fruit: string;
}

@Component({
  selector: 'app-select-signal-forms-demo',
  imports: [
    ScField,
    ScLabel,
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectLabel,
    JsonPipe,
    FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="fruitForm">
      <div class="space-y-4">
        <div scField>
          <label scLabel>Fruit</label>
          <div
            scSelect
            #select="scSelect"
            placeholder="Select a fruit"
            aria-label="Fruit dropdown"
            [formField]="fruitForm.fruit"
          >
            <div scSelectTrigger>
              <span scSelectLabel>
                <span class="truncate">{{ select.label() }}</span>
              </span>
            </div>
            <ng-template scSelectPortal>
              <div scSelectPopup>
                <div scSelectList>
                  @for (fruit of fruits; track fruit) {
                    <div scSelectItem [value]="fruit" [label]="fruit">
                      {{ fruit }}
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-md bg-muted p-4">
        <p class="text-sm font-medium">Form Values:</p>
        <pre class="mt-2 text-xs">{{ formModel() | json }}</pre>
      </div>
    </form>
  `,
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
}
