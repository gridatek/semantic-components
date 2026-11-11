import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Two heights: default, and sm (size="sm"), its chevron following. */
@Component({
  selector: 'app-sizes-native-select-demo',
  imports: [
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    SiChevronDownIcon,
  ],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      @for (size of sizes; track size) {
        <div scNativeSelectContainer>
          <select
            scNativeSelect
            [size]="size"
            [attr.aria-label]="size === 'sm' ? 'Small' : 'Default'"
          >
            <option scNativeSelectOption value="">
              {{ size === 'sm' ? 'Small' : 'Default' }}
            </option>
            <option scNativeSelectOption value="one">One</option>
            <option scNativeSelectOption value="two">Two</option>
          </select>
          <svg siChevronDownIcon scNativeSelectIcon></svg>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesNativeSelectDemo {
  protected readonly sizes = ['default', 'sm'] as const;
}
