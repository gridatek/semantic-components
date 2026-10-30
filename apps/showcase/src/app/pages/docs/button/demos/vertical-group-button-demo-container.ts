import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalGroupButtonDemo } from './vertical-group-button-demo';

@Component({
  selector: 'app-vertical-group-button-demo-container',
  imports: [DemoContainer, VerticalGroupButtonDemo],
  template: `
    <app-demo-container
      title="Vertical Group"
      demoUrl="/demos/button/vertical-group-button-demo"
      [code]="code"
    >
      <app-vertical-group-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalGroupButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScControlGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-vertical-group-button-demo',
  imports: [ScButton, ScControlGroup, SiMinusIcon, SiPlusIcon],
  template: \`
    <div scControlGroup orientation="vertical" aria-label="Media controls">
      <button scButton variant="outline" size="icon">
        <svg siPlusIcon></svg>
        <span class="sr-only">Volume up</span>
      </button>
      <button scButton variant="outline" size="icon">
        <svg siMinusIcon></svg>
        <span class="sr-only">Volume down</span>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalGroupButtonDemo {}`;
}
