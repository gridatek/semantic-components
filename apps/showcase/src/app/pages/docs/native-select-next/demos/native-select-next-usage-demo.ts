import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelectNext,
  ScNativeSelectNextContainer,
  ScNativeSelectNextIcon,
  ScNativeSelectNextOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** The browser's own select, in the preset's look: here a status, its label from the field. */
@Component({
  selector: 'app-native-select-next-usage-demo',
  imports: [
    ScField,
    ScLabel,
    ScNativeSelectNext,
    ScNativeSelectNextContainer,
    ScNativeSelectNextIcon,
    ScNativeSelectNextOption,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-56">
      <label scLabel>Status</label>
      <div scNativeSelectNextContainer class="w-full">
        <select scNativeSelectNext>
          <option scNativeSelectNextOption value="">Select status</option>
          <option scNativeSelectNextOption value="todo">Todo</option>
          <option scNativeSelectNextOption value="in-progress">
            In Progress
          </option>
          <option scNativeSelectNextOption value="done">Done</option>
          <option scNativeSelectNextOption value="cancelled">Cancelled</option>
        </select>
        <svg siChevronDownIcon scNativeSelectNextIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class NativeSelectNextUsageDemo {}
