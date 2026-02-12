import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ArrowKeysKbdDemo } from './arrow-keys-kbd-demo';

@Component({
  selector: 'app-arrow-keys-kbd-demo-container',
  imports: [DemoContainer, ArrowKeysKbdDemo],
  template: `
    <app-demo-container
      title="Arrow Keys"
      demoUrl="/demos/kbd/arrow-keys-kbd-demo"
      [code]="code"
    >
      <app-arrow-keys-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowKeysKbdDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-arrow-keys-kbd-demo',
  imports: [ScKbd],
  template: \`
    <div class="flex flex-col items-center gap-1">
      <kbd sc-kbd>↑</kbd>
      <div class="flex gap-1">
        <kbd sc-kbd>←</kbd>
        <kbd sc-kbd>↓</kbd>
        <kbd sc-kbd>→</kbd>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowKeysKbdDemo {}`;
}
