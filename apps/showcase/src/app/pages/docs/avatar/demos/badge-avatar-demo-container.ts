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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-badge-avatar-demo',
  imports: [ScAvatar, ScAvatarBadge, ScAvatarFallback, ScAvatarImage],
  template: \`
    <div class="flex items-center gap-4">
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback>CN</span>
        <span sc-avatar-badge></span>
      </span>
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback>CN</span>
        <span sc-avatar-badge class="bg-green-500"></span>
      </span>
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback>CN</span>
        <span sc-avatar-badge class="bg-yellow-500"></span>
      </span>
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback>CN</span>
        <span sc-avatar-badge class="bg-red-500"></span>
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeAvatarDemo {}`;
}
