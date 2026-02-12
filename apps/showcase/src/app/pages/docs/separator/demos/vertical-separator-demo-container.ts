import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalSeparatorDemo } from './vertical-separator-demo';

@Component({
  selector: 'app-vertical-separator-demo-container',
  imports: [DemoContainer, VerticalSeparatorDemo],
  template: `
    <app-demo-container title="Vertical" [code]="code">
      <app-vertical-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalSeparatorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSeparator } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-vertical-separator-demo',
  imports: [ScSeparator],
  template: \`
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Home</div>
      <div sc-separator orientation="vertical"></div>
      <div>Products</div>
      <div sc-separator orientation="vertical"></div>
      <div>About</div>
      <div sc-separator orientation="vertical"></div>
      <div>Contact</div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalSeparatorDemo {}`;
}
