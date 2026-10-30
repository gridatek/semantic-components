import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { IconButtonDemo } from './icon-button-demo';

@Component({
  selector: 'app-icon-button-demo-container',
  imports: [DemoContainer, IconButtonDemo],
  template: `
    <app-demo-container
      title="Icon"
      demoUrl="/demos/button/icon-button-demo"
      [code]="code"
    >
      <app-icon-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class IconButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiCircleFadingArrowUpIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-icon-button-demo',
  imports: [ScButton, SiCircleFadingArrowUpIcon],
  template: \`
    <button scButton variant="outline" size="icon">
      <svg siCircleFadingArrowUpIcon></svg>
      <span class="sr-only">Upgrade</span>
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class IconButtonDemo {}`;
}
