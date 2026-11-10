import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScLabelText, ScSwitch, ScSwitchField } from '@semantic-components/ui';

/** Text inside another label (a switch’s): scLabelText, a label’s look without a second label. */
@Component({
  selector: 'app-label-text-label-demo',
  imports: [ScLabelText, ScSwitch, ScSwitchField],
  template: `
    <div class="space-y-4">
      <label scSwitchField>
        <input scSwitch [(checked)]="airplaneMode" />
        <p scLabelText>Airplane Mode</p>
      </label>
      <label scSwitchField>
        <input scSwitch [(checked)]="wifi" />
        <p scLabelText>Wi-Fi</p>
      </label>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelTextLabelDemo {
  protected readonly airplaneMode = signal(false);
  protected readonly wifi = signal(true);
}
