import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScNativeSelectOptionGroup,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Options in groups (optgroup), each under its label. */
@Component({
  selector: 'app-groups-native-select-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOptionGroup,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-56">
      <label scLabel>Department</label>
      <div scNativeSelectContainer class="w-full">
        <select scNativeSelect>
          <option scNativeSelectOption value="">Select department</option>
          <optgroup scNativeSelectOptionGroup label="Engineering">
            <option scNativeSelectOption value="frontend">Frontend</option>
            <option scNativeSelectOption value="backend">Backend</option>
            <option scNativeSelectOption value="devops">DevOps</option>
          </optgroup>
          <optgroup scNativeSelectOptionGroup label="Sales">
            <option scNativeSelectOption value="sales-rep">Sales Rep</option>
            <option scNativeSelectOption value="account-manager">
              Account Manager
            </option>
            <option scNativeSelectOption value="sales-director">
              Sales Director
            </option>
          </optgroup>
          <optgroup scNativeSelectOptionGroup label="Operations">
            <option scNativeSelectOption value="support">
              Customer Support
            </option>
            <option scNativeSelectOption value="product-manager">
              Product Manager
            </option>
            <option scNativeSelectOption value="ops-manager">
              Operations Manager
            </option>
          </optgroup>
        </select>
        <svg siChevronDownIcon scNativeSelectIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupsNativeSelectDemo {}
