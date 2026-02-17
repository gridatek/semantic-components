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
} from '@semantic-components/ui';

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
    <div scAvatarGroup>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/vercel.png"
          alt="@vercel"
        />
        <span scAvatarFallback>VC</span>
      </span>
      <span scAvatar>
        <img scAvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
        <span scAvatarFallback>NX</span>
      </span>
      <span scAvatar>
        <img scAvatarImage src="https://github.com/react.png" alt="@react" />
        <span scAvatarFallback>RC</span>
      </span>
      <div scAvatarGroupCount>+3</div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupAvatarDemo {}`;
}
