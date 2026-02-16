import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScField, ScLabel } from '@semantic-components/ui';
import {
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
} from '@semantic-components/ui-lab';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-native-select-demo',
  imports: [
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScField,
    ScLabel,
    SiChevronDownIcon,
  ],
  template: `
    <div scField class="w-[280px]">
      <label scLabel>Framework</label>
      <div scNativeSelectContainer>
        <select scNativeSelect>
          <option value="">Select a framework</option>
          <option value="next">Next.js</option>
          <option value="angular">Angular</option>
          <option value="vue">Vue</option>
          <option value="svelte">Svelte</option>
        </select>
        <svg
          si-chevron-down-icon
          scNativeSelectIcon
          aria-hidden="true"
        ></svg>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeSelectDemo {}
