import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BadgeAvatarDemo } from './badge-avatar-demo';

@Component({
  selector: 'app-badge-avatar-demo-container',
  imports: [DemoContainer, BadgeAvatarDemo],
  template: `
    <app-demo-container
      title="With Badge"
      demoUrl="/demos/avatar/badge-avatar-demo"
      [code]="code"
    >
      <app-badge-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeAvatarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

@Component({
  selector: 'app-badge-avatar-demo',
  imports: [ScAvatar, ScAvatarBadge, ScAvatarFallback, ScAvatarImage],
  template: \`
    <div class="flex items-center gap-4">
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
        <span scAvatarBadge></span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
        <span scAvatarBadge class="bg-green-500"></span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
        <span scAvatarBadge class="bg-yellow-500"></span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
        <span scAvatarBadge class="bg-red-500"></span>
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeAvatarDemo {}`;
}
