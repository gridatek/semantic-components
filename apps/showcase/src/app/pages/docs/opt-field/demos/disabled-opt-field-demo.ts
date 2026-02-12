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
    <div sc-opt-field [disabled]="true" value="123456">
      <div sc-opt-field-slot-group>
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledOptFieldDemo {}
