import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicKbdDemo } from './basic-kbd-demo';

@Component({
  selector: 'app-basic-kbd-demo-container',
  imports: [DemoContainer, BasicKbdDemo],
  template: `
    <app-demo-container
      title="Basic Keys"
      demoUrl="/demos/kbd/basic-kbd-demo"
      [code]="code"
    >
      <app-basic-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKbdDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-kbd-demo',
  imports: [ScKbd],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <kbd sc-kbd>⌘</kbd>
      <kbd sc-kbd>Shift</kbd>
      <kbd sc-kbd>Alt</kbd>
      <kbd sc-kbd>Ctrl</kbd>
      <kbd sc-kbd>Enter</kbd>
      <kbd sc-kbd>Esc</kbd>
      <kbd sc-kbd>Tab</kbd>
      <kbd sc-kbd>Space</kbd>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicKbdDemo {}`;
}
