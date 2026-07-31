import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelTextLabelDemo } from './label-text-label-demo';

@Component({
  selector: 'app-label-text-label-demo-container',
  imports: [DemoContainer, LabelTextLabelDemo],
  template: `
    <app-demo-container
      title="Label Text"
      demoUrl="/demos/label/label-text-label-demo"
      [code]="code"
    >
      <app-label-text-label-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelTextLabelDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScLabelText, ScSwitch, ScSwitchField } from '@semantic-components/ui';

@Component({
  selector: 'app-label-text-label-demo',
  imports: [ScSwitch, ScSwitchField, ScLabelText],
  template: \`
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
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LabelTextLabelDemo {
  readonly airplaneMode = signal(false);
  readonly wifi = signal(true);
}`;
}
