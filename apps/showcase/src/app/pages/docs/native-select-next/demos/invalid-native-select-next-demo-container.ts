import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InvalidNativeSelectNextDemo } from './invalid-native-select-next-demo';

@Component({
  selector: 'app-invalid-native-select-next-demo-container',
  imports: [DemoContainer, InvalidNativeSelectNextDemo],
  template: `
    <app-demo-container
      title="Invalid"
      demoUrl="/demos/native-select-next/invalid-native-select-next-demo"
      [code]="code"
    >
      <app-invalid-native-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidNativeSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import {
  ScField,
  ScFieldErrors,
  ScLabel,
  ScNativeSelectNext,
  ScNativeSelectNextContainer,
  ScNativeSelectNextIcon,
  ScNativeSelectNextOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Invalid once touched (Signal Forms): marked, and its error read with it. */
@Component({
  selector: 'app-invalid-native-select-next-demo',
  imports: [
    FormField,
    ScField,
    ScFieldErrors,
    ScLabel,
    ScNativeSelectNext,
    ScNativeSelectNextContainer,
    ScNativeSelectNextIcon,
    ScNativeSelectNextOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-56">
      <label scLabel>Fruit</label>
      <div scNativeSelectNextContainer class="w-full">
        <select scNativeSelectNext [formField]="fruitForm.fruit">
          <option scNativeSelectNextOption value="">Select a fruit</option>
          <option scNativeSelectNextOption value="apple">Apple</option>
          <option scNativeSelectNextOption value="banana">Banana</option>
          <option scNativeSelectNextOption value="blueberry">Blueberry</option>
        </select>
        <svg siChevronDownIcon scNativeSelectNextIcon></svg>
      </div>
      <div scFieldErrors></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InvalidNativeSelectNextDemo {
  protected readonly fruitForm = form(signal({ fruit: '' }), (path) => {
    required(path.fruit, { message: 'Please select a fruit.' });
  });

  constructor() {
    // Touched already, to show it invalid.
    this.fruitForm.fruit().markAsTouched();
  }
}`;
}
