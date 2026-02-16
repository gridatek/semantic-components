import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScOptField,
  ScOptFieldSlotGroup,
  ScOptFieldSlot,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-opt-field-demo',
  imports: [ScOptField, ScOptFieldSlotGroup, ScOptFieldSlot],
  template: `
    <div scOptField [disabled]="true" value="123456">
      <div scOptFieldSlotGroup>
        <scOptFieldSlot />
        <scOptFieldSlot />
        <scOptFieldSlot />
        <scOptFieldSlot />
        <scOptFieldSlot />
        <scOptFieldSlot />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOptFieldDemo {}
