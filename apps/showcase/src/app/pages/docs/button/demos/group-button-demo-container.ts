import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupButtonDemo } from './group-button-demo';

@Component({
  selector: 'app-group-button-demo-container',
  imports: [DemoContainer, GroupButtonDemo],
  template: `
    <app-demo-container
      title="Control Group"
      demoUrl="/demos/button/group-button-demo"
      [code]="code"
    >
      <app-group-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupButtonDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScControlGroup } from '@semantic-components/ui';
import {
  SiArchiveIcon,
  SiClockIcon,
  SiFlagIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-group-button-demo',
  imports: [ScButton, ScControlGroup, SiArchiveIcon, SiClockIcon, SiFlagIcon],
  template: \`
    <div scControlGroup aria-label="Message actions">
      <button scButton variant="outline">
        <svg siArchiveIcon data-icon="inline-start"></svg>
        Archive
      </button>
      <button scButton variant="outline">
        <svg siFlagIcon data-icon="inline-start"></svg>
        Report
      </button>
      <button scButton variant="outline">
        <svg siClockIcon data-icon="inline-start"></svg>
        Snooze
      </button>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupButtonDemo {}`;
}
