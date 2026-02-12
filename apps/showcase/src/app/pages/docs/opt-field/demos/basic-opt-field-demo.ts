import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScOptField,
  ScOptFieldSlotGroup,
  ScOptFieldSlot,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-opt-field-demo',
  imports: [ScOptField, ScOptFieldSlotGroup, ScOptFieldSlot],
  template: `
    <div sc-opt-field [(value)]="otp">
      <div sc-opt-field-slot-group>
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
        <sc-opt-field-slot />
      </div>
    </div>
    <p class="text-sm text-muted-foreground mt-4">
      Value: {{ otp() || 'empty' }}
    </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOptFieldDemo {
  readonly otp = signal('');
}
