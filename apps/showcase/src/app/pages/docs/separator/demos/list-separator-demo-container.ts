import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ListSeparatorDemo } from './list-separator-demo';

@Component({
  selector: 'app-list-separator-demo-container',
  imports: [DemoContainer, ListSeparatorDemo],
  template: `
    <app-demo-container
      title="List"
      demoUrl="/demos/separator/list-separator-demo"
      [code]="code"
    >
      <app-list-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ListSeparatorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';

/** Lines between the items of a list. */
@Component({
  selector: 'app-list-separator-demo',
  imports: [ScSeparator],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl class="flex items-center justify-between">
        <dt>Item 1</dt>
        <dd class="text-muted-foreground">Value 1</dd>
      </dl>
      <div scSeparator></div>
      <dl class="flex items-center justify-between">
        <dt>Item 2</dt>
        <dd class="text-muted-foreground">Value 2</dd>
      </dl>
      <div scSeparator></div>
      <dl class="flex items-center justify-between">
        <dt>Item 3</dt>
        <dd class="text-muted-foreground">Value 3</dd>
      </dl>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ListSeparatorDemo {}`;
}
