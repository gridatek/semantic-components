import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BadgeInputDemo } from './badge-input-demo';

@Component({
  selector: 'app-badge-input-demo-container',
  imports: [DemoContainer, BadgeInputDemo],
  template: `
    <app-demo-container
      title="Badge"
      demoUrl="/demos/input/badge-input-demo"
      [code]="code"
    >
      <app-badge-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeInputDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge, ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-badge-input-demo',
  imports: [ScBadge, ScField, ScInput, ScLabel],
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>
        Webhook URL
        <span scBadge variant="secondary" class="ms-auto">Beta</span>
      </label>
      <input scInput type="url" placeholder="https://api.example.com/webhook" />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeInputDemo {}`;
}
