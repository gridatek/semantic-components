import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsLinkDemo } from './variants-link-demo';

@Component({
  selector: 'app-variants-link-demo-container',
  imports: [DemoContainer, VariantsLinkDemo],
  template: `
    <app-demo-container
      title="Variants"
      demoUrl="/demos/link/variants-link-demo"
      [code]="code"
    >
      <app-variants-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsLinkDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-link-demo',
  imports: [ScLink],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <a scLink href="#">Default</a>
      <a scLink variant="secondary" href="#">Secondary</a>
      <a scLink variant="destructive" href="#">Destructive</a>
      <a scLink variant="outline" href="#">Outline</a>
      <a scLink variant="ghost" href="#">Ghost</a>
      <a scLink variant="link" href="#">Link</a>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsLinkDemo {}`;
}
