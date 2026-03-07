import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScLabel,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
} from '@semantic-components/ui';
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
        <svg siChevronDownIcon scNativeSelectIcon aria-hidden="true"></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeSelectDemo {}
