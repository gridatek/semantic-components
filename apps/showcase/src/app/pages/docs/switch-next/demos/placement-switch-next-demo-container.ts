import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlacementSwitchNextDemo } from './placement-switch-next-demo';

@Component({
  selector: 'app-placement-switch-next-demo-container',
  imports: [DemoContainer, PlacementSwitchNextDemo],
  template: `
    <app-demo-container
      title="Placement"
      demoUrl="/demos/switch-next/placement-switch-next-demo"
      [code]="code"
    >
      <app-placement-switch-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlacementSwitchNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCard,
  ScCardContent,
  ScFieldDescription,
  ScFieldGroup,
  ScLabelText,
  ScSwitchNext,
  ScSwitchNextField,
} from '@semantic-components/ui';

/** The switch first, it is at the start; last, at the end — a settings list. */
@Component({
  selector: 'app-placement-switch-next-demo',
  imports: [
    ScCard,
    ScCardContent,
    ScFieldDescription,
    ScFieldGroup,
    ScLabelText,
    ScSwitchNext,
    ScSwitchNextField,
  ],
  template: \`
    <div scCard class="w-full max-w-md">
      <div scCardContent>
        <div scFieldGroup>
          <label scSwitchNextField>
            <p scLabelText>Marketing emails</p>
            <p scFieldDescription>
              Receive emails about new products and features.
            </p>
            <input type="checkbox" scSwitchNext [(checked)]="marketing" />
          </label>
          <label scSwitchNextField>
            <p scLabelText>Security emails</p>
            <p scFieldDescription>
              Receive emails about your account security.
            </p>
            <input type="checkbox" scSwitchNext [(checked)]="security" />
          </label>
          <label scSwitchNextField>
            <input type="checkbox" scSwitchNext [(checked)]="updates" />
            <p scLabelText>Product updates</p>
            <p scFieldDescription>
              Receive emails about product updates and tips.
            </p>
          </label>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PlacementSwitchNextDemo {
  protected readonly marketing = signal(false);
  protected readonly security = signal(true);
  protected readonly updates = signal(false);
}`;
}
