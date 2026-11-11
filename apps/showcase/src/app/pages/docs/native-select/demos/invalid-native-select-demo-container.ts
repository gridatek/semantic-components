import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidNativeSelectDemo } from './invalid-native-select-demo';

@Component({
  selector: 'app-invalid-native-select-demo-container',
  imports: [DemoContainer, InvalidNativeSelectDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/native-select/invalid-native-select-demo"
      [code]="code"
    >
      <app-invalid-native-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidNativeSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Invalid once touched (Signal Forms): marked, and its error read with it. */
@Component({
  selector: 'app-invalid-native-select-demo',
  imports: [
    FormField,
    ScField,
    ScFieldErrors,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-56">
      <label scLabel>Fruit</label>
      <div scNativeSelectContainer class="w-full">
        <select scNativeSelect [formField]="fruitForm.fruit">
          <option scNativeSelectOption value="">Select a fruit</option>
          <option scNativeSelectOption value="apple">Apple</option>
          <option scNativeSelectOption value="banana">Banana</option>
          <option scNativeSelectOption value="blueberry">Blueberry</option>
        </select>
        <svg siChevronDownIcon scNativeSelectIcon></svg>
      </div>
      <div scFieldErrors></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidNativeSelectDemo {
  protected readonly fruitForm = form(signal({ fruit: '' }), (path) => {
    required(path.fruit, { message: 'Please select a fruit.' });
  });

  constructor() {
    // Touched already, to show it invalid.
    this.fruitForm.fruit().markAsTouched();
  }
}`;
}
