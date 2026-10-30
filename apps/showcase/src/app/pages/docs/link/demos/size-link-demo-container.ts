import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizeLinkDemo } from './size-link-demo';

@Component({
  selector: 'app-size-link-demo-container',
  imports: [DemoContainer, SizeLinkDemo],
  template: `
    <app-demo-container
      title="Size"
      demoUrl="/demos/link/size-link-demo"
      [code]="code"
    >
      <app-size-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { SiArrowUpRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-size-link-demo',
  imports: [ScLink, SiArrowUpRightIcon],
  template: \`
    <div class="flex flex-wrap items-center gap-2">
      <a scLink variant="outline" size="xs" href="/docs/components/button"
        >Extra Small</a
      >
      <a scLink variant="outline" size="sm" href="/docs/components/button"
        >Small</a
      >
      <a scLink variant="outline" href="/docs/components/button">Default</a>
      <a scLink variant="outline" size="lg" href="/docs/components/button"
        >Large</a
      >
      <a scLink variant="outline" size="icon" href="/docs/components/button">
        <svg siArrowUpRightIcon></svg>
        <span class="sr-only">Button docs</span>
      </a>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizeLinkDemo {}`;
}
