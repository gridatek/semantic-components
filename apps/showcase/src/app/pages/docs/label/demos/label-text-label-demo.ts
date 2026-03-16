import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScLabelText, ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-label-text-label-demo',
  imports: [ScSwitch, ScSwitchField, ScLabelText],
  template: `
    <div class="space-y-4">
      <label scSwitchField>
        <input type="checkbox" scSwitch [(checked)]="airplaneMode" />
        <p scLabelText>Airplane Mode</p>
      </label>
      <label scSwitchField>
        <input type="checkbox" scSwitch [(checked)]="wifi" />
        <p scLabelText>Wi-Fi</p>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelTextLabelDemo {
  readonly airplaneMode = signal(false);
  readonly wifi = signal(true);
}
