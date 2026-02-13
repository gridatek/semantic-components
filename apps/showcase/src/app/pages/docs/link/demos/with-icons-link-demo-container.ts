import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithIconsLinkDemo } from './with-icons-link-demo';

@Component({
  selector: 'app-with-icons-link-demo-container',
  imports: [DemoContainer, WithIconsLinkDemo],
  template: `
    <app-demo-container
      title="With Icons"
      demoUrl="/demos/link/with-icons-link-demo"
      [code]="code"
    >
      <app-with-icons-link-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsLinkDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLink } from '@semantic-components/ui';
import {
  SiExternalLinkIcon,
  SiMailIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icons-link-demo',
  imports: [ScLink, SiExternalLinkIcon, SiMailIcon],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      <a sc-link href="#">
        <svg si-mail-icon></svg>
        Email
      </a>
      <a sc-link variant="outline" href="#">
        Open
        <svg si-external-link-icon></svg>
      </a>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsLinkDemo {}`;
}
