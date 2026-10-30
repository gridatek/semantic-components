import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { OrientationButtonGroupDemo } from './orientation-button-group-demo';

@Component({
  selector: 'app-orientation-button-group-demo-container',
  imports: [DemoContainer, OrientationButtonGroupDemo],
  template: `
    <app-demo-container
      title="Orientation"
      demoUrl="/demos/button-group/orientation-button-group-demo"
      [code]="code"
    >
      <app-orientation-button-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class OrientationButtonGroupDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import { SiMinusIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-orientation-button-group-demo',
  imports: [ScButton, ScButtonGroup, SiMinusIcon, SiPlusIcon],
  template: \`
    <div scButtonGroup orientation="vertical" aria-label="Media controls">
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
export class OrientationButtonGroupDemo {}`;
}
