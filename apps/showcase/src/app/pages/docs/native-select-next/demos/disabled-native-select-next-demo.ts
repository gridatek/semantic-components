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

/** Disabled: out of the tab order, the select and its chevron dimmed. */
@Component({
  selector: 'app-disabled-native-select-next-demo',
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
      <label scLabel>Priority</label>
      <div scNativeSelectNextContainer class="w-full">
        <select scNativeSelectNext disabled>
          <option scNativeSelectNextOption value="">Select priority</option>
          <option scNativeSelectNextOption value="low">Low</option>
          <option scNativeSelectNextOption value="medium">Medium</option>
          <option scNativeSelectNextOption value="high">High</option>
        </select>
        <svg siChevronDownIcon scNativeSelectNextIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledNativeSelectNextDemo {}
