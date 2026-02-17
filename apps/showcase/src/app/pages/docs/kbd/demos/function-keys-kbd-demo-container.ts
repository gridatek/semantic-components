import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FunctionKeysKbdDemo } from './function-keys-kbd-demo';

@Component({
  selector: 'app-function-keys-kbd-demo-container',
  imports: [DemoContainer, FunctionKeysKbdDemo],
  template: `
    <app-demo-container
      title="Function Keys"
      demoUrl="/demos/kbd/function-keys-kbd-demo"
      [code]="code"
    >
      <app-function-keys-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionKeysKbdDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-function-keys-kbd-demo',
  imports: [ScKbd],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <kbd scKbd>F1</kbd>
      <kbd scKbd>F2</kbd>
      <kbd scKbd>F3</kbd>
      <kbd scKbd>F4</kbd>
      <kbd scKbd>F5</kbd>
      <kbd scKbd>F6</kbd>
      <kbd scKbd>F7</kbd>
      <kbd scKbd>F8</kbd>
      <kbd scKbd>F9</kbd>
      <kbd scKbd>F10</kbd>
      <kbd scKbd>F11</kbd>
      <kbd scKbd>F12</kbd>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunctionKeysKbdDemo {}`;
}
