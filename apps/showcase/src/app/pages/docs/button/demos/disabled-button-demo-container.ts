import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledButtonDemo } from './disabled-button-demo';

@Component({
  selector: 'app-disabled-button-demo-container',
  imports: [DemoContainer, DisabledButtonDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/button/disabled-button-demo"
      [code]="code"
    >
      <app-disabled-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-button-demo',
  imports: [ScButton],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <button scButton disabled>Default</button>
      <button scButton variant="secondary" disabled>Secondary</button>
      <button scButton variant="destructive" disabled>Destructive</button>
      <button scButton variant="outline" disabled>Outline</button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledButtonDemo {}`;
}
