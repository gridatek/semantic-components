import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GroupIconAvatarDemo } from './group-icon-avatar-demo';

@Component({
  selector: 'app-group-icon-avatar-demo-container',
  imports: [DemoContainer, GroupIconAvatarDemo],
  template: `
    <app-demo-container
      title="Avatar Group with Icon"
      demoUrl="/demos/avatar/group-icon-avatar-demo"
      [code]="code"
    >
      <app-group-icon-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupIconAvatarDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-group-icon-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
    SiPlusIcon,
  ],
  template: \`
    <div scAvatarGroup class="grayscale">
      <span scAvatar>
        <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <span scAvatarFallback>CN</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/maxleiter.png"
          alt="@maxleiter"
        />
        <span scAvatarFallback>LR</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <span scAvatarFallback>ER</span>
      </span>
      <div scAvatarGroupCount><svg siPlusIcon></svg></div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupIconAvatarDemo {}`;
}
