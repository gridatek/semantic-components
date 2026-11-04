import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LinkBadgeDemo } from './link-badge-demo';

@Component({
  selector: 'app-link-badge-demo-container',
  imports: [DemoContainer, LinkBadgeDemo],
  template: `
    <app-demo-container
      title="Link"
      demoUrl="/demos/badge/link-badge-demo"
      [code]="code"
    >
      <app-link-badge-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkBadgeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScBadge } from '@semantic-components/ui';
import { SiArrowUpRightIcon } from '@semantic-icons/lucide-icons';

/** On an a: a link that looks like a badge, with a hover. */
@Component({
  selector: 'app-link-badge-demo',
  imports: [RouterLink, ScBadge, SiArrowUpRightIcon],
  template: \`
    <a scBadge routerLink="/docs/components/button">
      Open Link
      <svg siArrowUpRightIcon data-icon="inline-end"></svg>
    </a>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinkBadgeDemo {}`;
}
