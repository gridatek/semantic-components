import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithIconLinkDemo } from './with-icon-link-demo';

@Component({
  selector: 'app-with-icon-link-demo-container',
  imports: [DemoContainer, WithIconLinkDemo],
  template: `
    <app-demo-container
      title="With Icon"
      demoUrl="/demos/link/with-icon-link-demo"
      [code]="code"
    >
      <app-with-icon-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icon-link-demo',
  imports: [ScLink, SiArrowLeftIcon, SiArrowRightIcon],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <a scLink variant="outline" href="/docs/components/badge">
        <svg siArrowLeftIcon data-icon="inline-start"></svg>
        Badge
      </a>
      <a scLink variant="outline" href="/docs/components/card">
        Card
        <svg siArrowRightIcon data-icon="inline-end"></svg>
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class WithIconLinkDemo {}`;
}
