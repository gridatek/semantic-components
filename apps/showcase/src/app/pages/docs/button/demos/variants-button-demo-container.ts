import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsButtonDemo } from './variants-button-demo';

@Component({
  selector: 'app-variants-button-demo-container',
  imports: [DemoContainer, VariantsButtonDemo],
  template: `
    <app-demo-container
      title="Variants"
      demoUrl="/demos/button/variants-button-demo"
      [code]="code"
    >
      <app-variants-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-button-demo',
  imports: [ScButton],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <button scButton>Default</button>
      <button scButton variant="secondary">Secondary</button>
      <button scButton variant="destructive">Destructive</button>
      <button scButton variant="outline">Outline</button>
      <button scButton variant="ghost">Ghost</button>
      <button scButton variant="link">Link</button>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsButtonDemo {}`;
}
