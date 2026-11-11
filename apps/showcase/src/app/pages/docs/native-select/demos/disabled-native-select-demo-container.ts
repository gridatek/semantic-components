import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledNativeSelectDemo } from './disabled-native-select-demo';

@Component({
  selector: 'app-disabled-native-select-demo-container',
  imports: [DemoContainer, DisabledNativeSelectDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/native-select/disabled-native-select-demo"
      [code]="code"
    >
      <app-disabled-native-select-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledNativeSelectDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Disabled: out of the tab order, the select and its chevron dimmed. */
@Component({
  selector: 'app-disabled-native-select-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-56">
      <label scLabel>Priority</label>
      <div scNativeSelectContainer class="w-full">
        <select scNativeSelect disabled>
          <option scNativeSelectOption value="">Select priority</option>
          <option scNativeSelectOption value="low">Low</option>
          <option scNativeSelectOption value="medium">Medium</option>
          <option scNativeSelectOption value="high">High</option>
        </select>
        <svg siChevronDownIcon scNativeSelectIcon></svg>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledNativeSelectDemo {}`;
}
