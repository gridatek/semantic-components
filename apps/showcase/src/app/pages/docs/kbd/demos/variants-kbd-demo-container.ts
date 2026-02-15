import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsKbdDemo } from './variants-kbd-demo';

@Component({
  selector: 'app-variants-kbd-demo-container',
  imports: [DemoContainer, VariantsKbdDemo],
  template: `
    <app-demo-container
      title="Variants"
      demoUrl="/demos/kbd/variants-kbd-demo"
      [code]="code"
    >
      <app-variants-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsKbdDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-variants-kbd-demo',
  imports: [ScKbd],
  template: \`
    <div class="flex items-center gap-4">
      <kbd sc-kbd>⌘</kbd>
      <kbd sc-kbd>K</kbd>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsKbdDemo {}`;
}
