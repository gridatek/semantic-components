import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** The browser's own select, in the preset's look: here a status, its label from the field. */
@Component({
  selector: 'app-native-select-usage-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-56">
      <label scLabel>Status</label>
      <div scNativeSelectContainer class="w-full">
        <select scNativeSelect>
          <option scNativeSelectOption value="">Select status</option>
          <option scNativeSelectOption value="todo">Todo</option>
          <option scNativeSelectOption value="in-progress">In Progress</option>
          <option scNativeSelectOption value="done">Done</option>
          <option scNativeSelectOption value="cancelled">Cancelled</option>
        </select>
        <svg siChevronDownIcon scNativeSelectIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NativeSelectUsageDemo {}
