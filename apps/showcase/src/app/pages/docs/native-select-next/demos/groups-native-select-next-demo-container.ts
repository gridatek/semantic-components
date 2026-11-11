import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupsNativeSelectNextDemo } from './groups-native-select-next-demo';

@Component({
  selector: 'app-groups-native-select-next-demo-container',
  imports: [DemoContainer, GroupsNativeSelectNextDemo],
  template: `
    <app-demo-container
      title="Groups"
      demoUrl="/demos/native-select-next/groups-native-select-next-demo"
      [code]="code"
    >
      <app-groups-native-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsNativeSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelectNext,
  ScNativeSelectNextContainer,
  ScNativeSelectNextIcon,
  ScNativeSelectNextOptGroup,
  ScNativeSelectNextOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Options in groups (optgroup), each under its label. */
@Component({
  selector: 'app-groups-native-select-next-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelectNext,
    ScNativeSelectNextContainer,
    ScNativeSelectNextIcon,
    ScNativeSelectNextOptGroup,
    ScNativeSelectNextOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div scField class="w-56">
      <label scLabel>Department</label>
      <div scNativeSelectNextContainer class="w-full">
        <select scNativeSelectNext>
          <option scNativeSelectNextOption value="">Select department</option>
          <optgroup scNativeSelectNextOptGroup label="Engineering">
            <option scNativeSelectNextOption value="frontend">Frontend</option>
            <option scNativeSelectNextOption value="backend">Backend</option>
            <option scNativeSelectNextOption value="devops">DevOps</option>
          </optgroup>
          <optgroup scNativeSelectNextOptGroup label="Sales">
            <option scNativeSelectNextOption value="sales-rep">
              Sales Rep
            </option>
            <option scNativeSelectNextOption value="account-manager">
              Account Manager
            </option>
            <option scNativeSelectNextOption value="sales-director">
              Sales Director
            </option>
          </optgroup>
          <optgroup scNativeSelectNextOptGroup label="Operations">
            <option scNativeSelectNextOption value="support">
              Customer Support
            </option>
            <option scNativeSelectNextOption value="product-manager">
              Product Manager
            </option>
            <option scNativeSelectNextOption value="ops-manager">
              Operations Manager
            </option>
          </optgroup>
        </select>
        <svg siChevronDownIcon scNativeSelectNextIcon></svg>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsNativeSelectNextDemo {}`;
}
