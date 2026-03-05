import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSelect,
  ScSelectInput,
  ScSelectItem,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-select-disabled-demo',
  imports: [
    ScSelect,
    ScSelectItem,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectInput,
  ],
  template: `
    <div scSelect disabled>
      <div scSelectTrigger>
        <input
          scSelectInput
          placeholder="Select a fruit"
          aria-label="Fruit dropdown"
        />
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            <div scSelectItem value="Apple" label="Apple">Apple</div>
            <div scSelectItem value="Banana" label="Banana">Banana</div>
            <div scSelectItem value="Orange" label="Orange">Orange</div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDisabledDemo {}
