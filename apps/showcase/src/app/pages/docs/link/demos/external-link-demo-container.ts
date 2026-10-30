import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ExternalLinkDemo } from './external-link-demo';

@Component({
  selector: 'app-external-link-demo-container',
  imports: [DemoContainer, ExternalLinkDemo],
  template: `
    <app-demo-container
      title="External"
      demoUrl="/demos/link/external-link-demo"
      [code]="code"
    >
      <app-external-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ExternalLinkDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import { SiExternalLinkIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-external-link-demo',
  imports: [ScLink, SiExternalLinkIcon],
  template: \`
    <a
      scLink
      variant="outline"
      href="https://github.com/gridatek/semantic-components"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
      <svg siExternalLinkIcon data-icon="inline-end"></svg>
      <span class="sr-only">(opens in a new tab)</span>
    </a>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ExternalLinkDemo {}`;
}
