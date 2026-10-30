import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RoundedButtonDemo } from './rounded-button-demo';

@Component({
  selector: 'app-rounded-button-demo-container',
  imports: [DemoContainer, RoundedButtonDemo],
  template: `
    <app-demo-container
      title="Rounded"
      demoUrl="/demos/button/rounded-button-demo"
      [code]="code"
    >
      <app-rounded-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RoundedButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiArrowUpIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rounded-button-demo',
  imports: [ScButton, SiArrowUpIcon],
  template: \`
    <button scButton variant="outline" size="icon" class="rounded-full">
      <svg siArrowUpIcon></svg>
      <span class="sr-only">Scroll to top</span>
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RoundedButtonDemo {}`;
}
