import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledSwitchDemo } from './disabled-switch-demo';

@Component({
  selector: 'app-disabled-switch-demo-container',
  imports: [DemoContainer, DisabledSwitchDemo],
  template: `
    <app-demo-container title="Disabled" [code]="code">
      <app-disabled-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSwitchDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-switch-demo',
  imports: [ScSwitch],
  template: \`
    <div class="space-y-3">
      <div class="flex items-center space-x-2">
        <button sc-switch [disabled]="true" id="disabled-off"></button>
        <label
          for="disabled-off"
          class="text-sm font-medium leading-none text-muted-foreground"
        >
          Disabled (Off)
        </label>
      </div>
      <div class="flex items-center space-x-2">
        <button
          sc-switch
          [checked]="true"
          [disabled]="true"
          id="disabled-on"
        ></button>
        <label
          for="disabled-on"
          class="text-sm font-medium leading-none text-muted-foreground"
        >
          Disabled (On)
        </label>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledSwitchDemo {}`;
}
