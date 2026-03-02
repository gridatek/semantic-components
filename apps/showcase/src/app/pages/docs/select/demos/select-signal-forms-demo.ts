import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { FormRoot, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScSelect,
  ScSelectItem,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
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
    // FormField,
    FormRoot,
  ],
  template: `
    <form [formRoot]="fruitForm">
      <div class="space-y-4">
        <div scField>
          <label scLabel>Fruit</label>
          <!--div
            scSelect
            #select="scSelect"
            placeholder="Select a fruit"
            aria-label="Fruit dropdown"
            [formField]="fruitForm.fruit"
          >
            <div scSelectTrigger>
              <span scSelectLabel></span>
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
          </div-->
          <div
            scSelect
            #select="scSelect"
            placeholder="Select a fruit"
            aria-label="Fruit dropdown"
          >
            <div scSelectTrigger>
              <span scSelectLabel></span>
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

      <div class="bg-muted mt-6 rounded-md p-4">
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
