import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { AsLinkButtonDemo } from './as-link-button-demo';

@Component({
  selector: 'app-as-link-button-demo-container',
  imports: [DemoContainer, AsLinkButtonDemo],
  template: `
    <app-demo-container
      title="As Link"
      demoUrl="/demos/button/as-link-button-demo"
      [code]="code"
    >
      <app-as-link-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsLinkButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-as-link-button-demo',
  imports: [ScLink],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link>Default</a>
      <a sc-link variant="outline">Outline</a>
      <a sc-link variant="secondary">Secondary</a>
      <a sc-link variant="ghost">Ghost</a>
      <a sc-link variant="destructive">Destructive</a>
      <a sc-link variant="link">Link</a>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsLinkButtonDemo {}`;
}
