import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InlineKbdDemo } from './inline-kbd-demo';

@Component({
  selector: 'app-inline-kbd-demo-container',
  imports: [DemoContainer, InlineKbdDemo],
  template: `
    <app-demo-container
      title="Inline Usage"
      demoUrl="/demos/kbd/inline-kbd-demo"
      [code]="code"
    >
      <app-inline-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineKbdDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScKbd } from '@semantic-components/ui';

@Component({
  selector: 'app-inline-kbd-demo',
  imports: [ScKbd],
  template: \`
    <div class="space-y-2">
      <p class="text-muted-foreground text-sm">
        Press
        <kbd scKbd>⌘</kbd>
        <kbd scKbd>K</kbd>
        to open the command palette, or
        <kbd scKbd>Esc</kbd>
        to close it.
      </p>
      <p class="text-muted-foreground text-sm">
        Use
        <kbd scKbd>Tab</kbd>
        to navigate between fields and
        <kbd scKbd>Enter</kbd>
        to submit.
      </p>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineKbdDemo {}`;
}
