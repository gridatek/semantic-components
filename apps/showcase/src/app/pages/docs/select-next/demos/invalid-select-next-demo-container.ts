import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidSelectNextDemo } from './invalid-select-next-demo';

@Component({
  selector: 'app-invalid-select-next-demo-container',
  imports: [DemoContainer, InvalidSelectNextDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/select-next/invalid-select-next-demo"
      [code]="code"
    >
      <app-invalid-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScSelectNext,
  ScSelectNextGroup,
  ScSelectNextIcon,
  ScSelectNextItem,
  ScSelectNextItemIndicator,
  ScSelectNextItemText,
  ScSelectNextLabel,
  ScSelectNextList,
  ScSelectNextPopup,
  ScSelectNextPortal,
  ScSelectNextTrigger,
  ScSelectNextValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Required by the form; invalid once touched, the error read with it. */
@Component({
  selector: 'app-invalid-select-next-demo',
  imports: [
    FormField,
    ScField,
    ScFieldErrors,
    ScSelectNext,
    ScSelectNextGroup,
    ScSelectNextIcon,
    ScSelectNextItem,
    ScSelectNextItemIndicator,
    ScSelectNextItemText,
    ScSelectNextLabel,
    ScSelectNextList,
    ScSelectNextPopup,
    ScSelectNextPortal,
    ScSelectNextTrigger,
    ScSelectNextValue,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-full max-w-48">
      <div scSelectNext [formField]="fruitForm.fruit" [items]="fruits">
        <div scSelectNextLabel>Fruit</div>
        <div scSelectNextTrigger class="w-full">
          <span scSelectNextValue placeholder="Select a fruit"></span>
          <svg scSelectNextIcon siChevronDownIcon></svg>
        </div>
        <ng-template scSelectNextPortal>
          <div scSelectNextPopup>
            <div scSelectNextList>
              <div scSelectNextGroup>
                @for (item of fruits; track item.value) {
                  <div scSelectNextItem [value]="item.value">
                    <span scSelectNextItemText>{{ item.label }}</span>
                    <span scSelectNextItemIndicator>
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
export class InvalidSelectNextDemo {
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
