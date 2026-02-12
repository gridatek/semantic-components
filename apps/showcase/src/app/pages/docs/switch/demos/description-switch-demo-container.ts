import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DescriptionSwitchDemo } from './description-switch-demo';

@Component({
  selector: 'app-description-switch-demo-container',
  imports: [DemoContainer, DescriptionSwitchDemo],
  template: `
    <app-demo-container title="With Description" [code]="code">
      <app-description-switch-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionSwitchDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSwitch } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-description-switch-demo',
  imports: [ScSwitch],
  template: \`
    <div
      class="flex flex-row items-center justify-between rounded-lg border p-4"
    >
      <div class="space-y-0.5">
        <label for="dark-mode" class="text-base font-medium">Dark Mode</label>
        <p class="text-sm text-muted-foreground">
          Enable dark mode for a better viewing experience in low light.
        </p>
      </div>
      <button sc-switch id="dark-mode"></button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionSwitchDemo {}`;
}
