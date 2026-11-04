import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BadgeIconAvatarDemo } from './badge-icon-avatar-demo';

@Component({
  selector: 'app-badge-icon-avatar-demo-container',
  imports: [DemoContainer, BadgeIconAvatarDemo],
  template: `
    <app-demo-container
      title="Badge with Icon"
      demoUrl="/demos/avatar/badge-icon-avatar-demo"
      [code]="code"
    >
      <app-badge-icon-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeIconAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-badge-icon-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarBadge,
    ScAvatarFallback,
    ScAvatarImage,
    SiPlusIcon,
  ],
  template: \`
    <span scAvatar class="grayscale">
      <img
        scAvatarImage
        src="https://github.com/pranathip.png"
        alt="@pranathip"
      />
      <span scAvatarFallback>PP</span>
      <span scAvatarBadge><svg siPlusIcon></svg></span>
    </span>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeIconAvatarDemo {}`;
}
