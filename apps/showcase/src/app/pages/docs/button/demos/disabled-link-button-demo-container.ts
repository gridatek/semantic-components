import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledLinkButtonDemo } from './disabled-link-button-demo';

@Component({
  selector: 'app-disabled-link-button-demo-container',
  imports: [DemoContainer, DisabledLinkButtonDemo],
  template: `
    <app-demo-container
      title="Disabled Link"
      demoUrl="/demos/button/disabled-link-button-demo"
      [code]="code"
    >
      <app-disabled-link-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-disabled-link-button-demo',
  imports: [ScLink],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link disabled>Default</a>
      <a sc-link variant="secondary" disabled>Secondary</a>
      <a sc-link variant="destructive" disabled>Destructive</a>
      <a sc-link variant="outline" disabled>Outline</a>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledLinkButtonDemo {}`;
}
