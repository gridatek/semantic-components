import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BadgeAvatarDemo } from './badge-avatar-demo';

@Component({
  selector: 'app-badge-avatar-demo-container',
  imports: [DemoContainer, BadgeAvatarDemo],
  template: `
    <app-demo-container
      title="Badge"
      demoUrl="/demos/avatar/badge-avatar-demo"
      [code]="code"
    >
      <app-badge-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

/** A badge in the corner: a status, in your color. */
@Component({
  selector: 'app-badge-avatar-demo',
  imports: [ScAvatar, ScAvatarBadge, ScAvatarFallback, ScAvatarImage],
  template: \`
    <span scAvatar>
      <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <span scAvatarFallback>CN</span>
      <span scAvatarBadge class="bg-green-600 dark:bg-green-800"></span>
    </span>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeAvatarDemo {}`;
}
