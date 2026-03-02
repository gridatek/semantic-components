import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOptField,
  ScOptFieldSlot,
  ScOptFieldSlotGroup,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-opt-field-demo',
  imports: [ScOptField, ScOptFieldSlotGroup, ScOptFieldSlot],
  template: `
    <div scOptField [(value)]="otp">
      <div scOptFieldSlotGroup>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ otp() || 'empty' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOptFieldDemo {
  readonly otp = signal('');
}
