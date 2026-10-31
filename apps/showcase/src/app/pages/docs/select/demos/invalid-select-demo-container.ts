import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidSelectDemo } from './invalid-select-demo';

@Component({
  selector: 'app-invalid-select-demo-container',
  imports: [DemoContainer, InvalidSelectDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/select/invalid-select-demo"
      [code]="code"
    >
      <app-invalid-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Required by the form; invalid once touched, the error read with it. */
@Component({
  selector: 'app-invalid-select-demo',
  imports: [
    FormField,
    ScField,
    ScFieldErrors,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-full max-w-48">
      <div
        scSelect
        [formField]="fruitForm.fruit"
        [items]="fruits"
        class="w-full"
      >
        <div scSelectLabel>Fruit</div>
        <div scSelectTrigger>
          <span scSelectValue placeholder="Select a fruit"></span>
          <svg scSelectIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectPortal>
          <div scSelectPopup>
            <div scSelectList>
              <div scSelectGroup>
                @for (item of fruits; track item.value) {
                  <div scSelectItem [value]="item.value">
                    <span scSelectItemText>{{ item.label }}</span>
                    <span scSelectItemIndicator>
                      <svg siCheckIcon></svg>
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </ng-template>
      </div>
      <div scFieldErrors></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSelectDemo {
  protected readonly fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
  ];
  private readonly model = signal({ fruit: '' });
  protected readonly fruitForm = form(this.model, (s) =>
    required(s.fruit, { message: 'Please select a fruit.' }),
  );

  constructor() {
    // Shown as if the reader had already left it.
    this.fruitForm.fruit().markAsTouched();
  }
}`;
}
