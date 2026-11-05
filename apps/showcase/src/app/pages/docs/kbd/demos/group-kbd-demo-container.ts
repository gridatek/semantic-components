import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupKbdDemo } from './group-kbd-demo';

@Component({
  selector: 'app-group-kbd-demo-container',
  imports: [DemoContainer, GroupKbdDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/kbd/group-kbd-demo"
      [code]="code"
    >
      <app-group-kbd-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupKbdDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScKbdGroup } from '@semantic-components/ui';

/** Keys together in a scKbdGroup, here in a sentence. */
@Component({
  selector: 'app-group-kbd-demo',
  imports: [ScKbd, ScKbdGroup],
  template: \`
    <p class="text-muted-foreground text-sm">
      Use
      <kbd scKbdGroup>
        <kbd scKbd>Ctrl + B</kbd>
        <kbd scKbd>Ctrl + K</kbd>
      </kbd>
      to open the command palette
    </p>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupKbdDemo {}`;
}
