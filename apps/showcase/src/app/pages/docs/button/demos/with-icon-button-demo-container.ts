import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithIconButtonDemo } from './with-icon-button-demo';

@Component({
  selector: 'app-with-icon-button-demo-container',
  imports: [DemoContainer, WithIconButtonDemo],
  template: `
    <app-demo-container
      title="With Icon"
      demoUrl="/demos/button/with-icon-button-demo"
      [code]="code"
    >
      <app-with-icon-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiGitBranchIcon, SiGitForkIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icon-button-demo',
  imports: [ScButton, SiGitBranchIcon, SiGitForkIcon],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <button scButton variant="outline" size="sm">
        <svg siGitBranchIcon data-icon="inline-start"></svg>
        New Branch
      </button>
      <button scButton variant="outline" size="sm">
        Fork
        <svg siGitForkIcon data-icon="inline-end"></svg>
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconButtonDemo {}`;
}
