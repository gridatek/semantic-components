import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledLinkDemo } from './disabled-link-demo';

@Component({
  selector: 'app-disabled-link-demo-container',
  imports: [DemoContainer, DisabledLinkDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/link/disabled-link-demo"
      [code]="code"
    >
      <app-disabled-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-disabled-link-demo',
  imports: [ScLink],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link disabled href="#">Disabled Default</a>
      <a sc-link variant="secondary" disabled href="#">Disabled Secondary</a>
      <a sc-link variant="outline" disabled href="#">Disabled Outline</a>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkDemo {}`;
}
