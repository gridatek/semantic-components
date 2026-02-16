import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupAvatarDemo } from './group-avatar-demo';

@Component({
  selector: 'app-group-avatar-demo-container',
  imports: [DemoContainer, GroupAvatarDemo],
  template: `
    <app-demo-container
      title="Group"
      demoUrl="/demos/avatar/group-avatar-demo"
      [code]="code"
    >
      <app-group-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupAvatarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-group-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
  ],
  template: \`
    <div sc-avatar-group>
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback>CN</span>
      </span>
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/vercel.png"
          alt="@vercel"
        />
        <span sc-avatar-fallback>VC</span>
      </span>
      <span sc-avatar>
        <img sc-avatar-image src="https://github.com/nextjs.png" alt="@nextjs" />
        <span sc-avatar-fallback>NX</span>
      </span>
      <span sc-avatar>
        <img sc-avatar-image src="https://github.com/react.png" alt="@react" />
        <span sc-avatar-fallback>RC</span>
      </span>
      <div sc-avatar-group-count>+3</div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupAvatarDemo {}`;
}
