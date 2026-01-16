import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ScSelect,
  ScSelectContent,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-select-demo',
  imports: [
    ScSelect,
    ScSelectTrigger,
    ScSelectValue,
    ScSelectIcon,
    ScSelectContent,
    ScSelectItem,
    ScSelectItemIndicator,
    SiChevronDownIcon,
    SiCheckIcon,
  ],
  template: `
    <div scSelect placeholder="Select a fruit">
      <div scSelectTrigger>
        <span class="absolute left-3" scSelectValue></span>
        <svg class="absolute right-3" scSelectIcon si-chevron-down-icon></svg>
      </div>
      <div scSelectContent>
        @for (fruit of fruits; track fruit) {
          <div [value]="fruit" scSelectItem>
            <span class="flex-1">{{ fruit }}</span>
            <span scSelectItemIndicator>
              <svg class="size-4" si-check-icon></svg>
            </span>
          </div>
        }
      </div>
    </div>
  `,
  host: {
    class: 'block w-[180px]',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemo {
  fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
}
