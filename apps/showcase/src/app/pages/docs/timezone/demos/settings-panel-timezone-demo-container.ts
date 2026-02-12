import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SettingsPanelTimezoneDemo } from './settings-panel-timezone-demo';

@Component({
  selector: 'app-settings-panel-timezone-demo-container',
  imports: [DemoContainer, SettingsPanelTimezoneDemo],
  template: `
    <app-demo-container title="Settings Panel" [code]="code">
      <app-settings-panel-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-settings-panel-timezone-demo',
  imports: [ScTimezoneSelect],
  template: \`
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label class="text-sm font-medium">Timezone</label>
            <p class="text-sm text-muted-foreground">Select your timezone</p>
          </div>
          <sc-timezone-select class="w-56"></sc-timezone-select>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelTimezoneDemo {}`;
}
