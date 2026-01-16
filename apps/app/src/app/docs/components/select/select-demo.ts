import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { OverlayModule } from '@angular/cdk/overlay';
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
    ComboboxPopupContainer,
    OverlayModule,
  ],
  template: `
    <div scSelect placeholder="Select a fruit">
      <div #origin scSelectTrigger>
        <span scSelectValue></span>
        <svg scSelectIcon si-chevron-down-icon></svg>
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlayOrigin]="origin"
          [cdkConnectedOverlayOpen]="true"
          [cdkConnectedOverlayWidth]="origin.offsetWidth"
          cdkConnectedOverlay
        >
          <div scSelectContent>
            @for (fruit of fruits; track fruit) {
              <div [value]="fruit" scSelectItem>
                <span>{{ fruit }}</span>
                <span scSelectItemIndicator>
                  <svg si-check-icon></svg>
                </span>
              </div>
            }
          </div>
        </ng-template>
      </ng-template>
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
